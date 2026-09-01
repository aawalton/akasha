import { CliError, OperationalError } from "@akasha/errors-core/exit-code"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { ASC_ISSUER_ID, ASC_KEY_ID } from "../foundation/foundation.module.code.ts"
import { classifyTestflightFailure } from "../ios-signing/ios-signing.module.code.ts"

export const ALTOOL_MARKERS = {
  validateBegin: "MOBILE_DEPLOY_TESTFLIGHT_VALIDATE_BEGIN",
  validateOk: "MOBILE_DEPLOY_TESTFLIGHT_VALIDATE_OK",
  uploadBegin: "MOBILE_DEPLOY_TESTFLIGHT_UPLOAD_BEGIN",
  uploadOk: "MOBILE_DEPLOY_TESTFLIGHT_OK",
} as const

export const EXIT_VALIDATION_INCOMPLETE = 4

const MISSING_PURPOSE_STRING_CODE = 90683

export type AltoolFailureClass =
  | "MISSING_PURPOSE_STRING"
  | "APP_STORE_VALIDATION_REJECTED"
  | "VALIDATION_UNREACHABLE"

export interface AltoolFailure {
  readonly failureClass: AltoolFailureClass
  readonly remediation: string
  readonly exitCode: number
}

export interface AppStoreVerdict {
  readonly code: number
  readonly description: string
}

const MISSING_PURPOSE_STRING_REMEDIATION =
  "App Store validation rejected the build: the app Info.plist is missing " +
  "NSHealthUpdateUsageDescription. Apple keys this on the com.apple.developer.healthkit " +
  "ENTITLEMENT, not on which HealthKit APIs the code calls — an app that only ever READS " +
  "still needs the write purpose string, and the entitlement has no read-only variant to " +
  "narrow to. The string is a mandatory DISCLOSURE, not a capability: writing additionally " +
  "requires a toShare authorization request the app never makes. Fix: ensure the HealthKit " +
  "usage-description seam in `apply-ios-seam.sh` adds BOTH NSHealthShareUsageDescription and " +
  "NSHealthUpdateUsageDescription (the `healthkit-read-only` check pins this), then re-cut. " +
  "To ship without HealthKit entirely, set NATIVE_SHELL_HEALTHKIT=0, which removes the " +
  "entitlement and both usage strings together."

const VALIDATION_UNREACHABLE_REMEDIATION =
  "App Store validation did NOT complete — altool exited non-zero without returning a verdict " +
  "from Apple (no validation error code and no VERIFY FAILED banner in its output). The build " +
  "is therefore UNVALIDATED, which is NOT the same as valid: this is not evidence the build " +
  "would pass. Usual causes are a network failure reaching App Store Connect from the macbook, " +
  "an expired or unauthorized App Store Connect API key, or an ASC outage. Check connectivity " +
  `from the macbook and that AuthKey_${ASC_KEY_ID}.p8 is present in ` +
  "~/.appstoreconnect/private_keys, then re-run. The full altool diagnostic is in the durable " +
  "log above."

const IRIS_CODE_RE = /^[ \t]*iris-code[ \t]*:[ \t]*(\d+)/m
const SERVER_CODE_RE = /\bcode[ \t]*=[ \t]*(\d+);/
const DESCRIPTION_RE = /^[ \t]+description[ \t]*:[ \t]*(.+)$/m

const CODE_SCHEMA = z.tuple([z.coerce.number().int().positive()])
const DESCRIPTION_SCHEMA = z.tuple([z.string().min(1)])

export function extractAppStoreVerdict(output: string): AppStoreVerdict | undefined {
  const codeRe = IRIS_CODE_RE.test(output)
    ? IRIS_CODE_RE
    : SERVER_CODE_RE.test(output)
      ? SERVER_CODE_RE
      : undefined
  if (codeRe === undefined) return undefined
  const [code] = requireMatchPositional(codeRe, CODE_SCHEMA, output, "altool verdict code")
  const description = DESCRIPTION_RE.test(output)
    ? requireMatchPositional(DESCRIPTION_RE, DESCRIPTION_SCHEMA, output, "altool verdict text")[0]
    : ""
  return { code, description: description.trim() }
}

export function classifyAltoolFailure(output: string): AltoolFailure {
  const verdict = extractAppStoreVerdict(output)
  if (verdict !== undefined) {
    if (verdict.code === MISSING_PURPOSE_STRING_CODE) {
      return {
        failureClass: "MISSING_PURPOSE_STRING",
        remediation: MISSING_PURPOSE_STRING_REMEDIATION,
        exitCode: 3,
      }
    }
    const detail = verdict.description === "" ? "" : ` ${verdict.description}`
    return {
      failureClass: "APP_STORE_VALIDATION_REJECTED",
      remediation: `App Store validation rejected the build — Apple error ${verdict.code}:${detail}`,
      exitCode: 3,
    }
  }
  if (output.includes("VERIFY FAILED")) {
    return {
      failureClass: "APP_STORE_VALIDATION_REJECTED",
      remediation:
        "App Store validation rejected the build, but altool emitted no parseable error code — " +
        "read the altool diagnostic in the durable log above for Apple's stated reason.",
      exitCode: 3,
    }
  }
  return {
    failureClass: "VALIDATION_UNREACHABLE",
    remediation: VALIDATION_UNREACHABLE_REMEDIATION,
    exitCode: EXIT_VALIDATION_INCOMPLETE,
  }
}

export function altoolStepFailed(output: string): boolean {
  const failedAt = (begin: string, ok: string): boolean =>
    output.includes(begin) && !output.includes(ok)
  return (
    failedAt(ALTOOL_MARKERS.validateBegin, ALTOOL_MARKERS.validateOk) ||
    failedAt(ALTOOL_MARKERS.uploadBegin, ALTOOL_MARKERS.uploadOk)
  )
}

export function testflightFailureError(out: string): CliError | OperationalError {
  const signing = classifyTestflightFailure(out)
  if (signing !== undefined) {
    return new OperationalError(
      `TestFlight deploy failed — ${signing.failureClass}: ${signing.remediation}`
    )
  }
  if (altoolStepFailed(out)) {
    const altool = classifyAltoolFailure(out)
    const message = `TestFlight deploy failed — ${altool.failureClass}: ${altool.remediation}`
    return altool.exitCode === EXIT_VALIDATION_INCOMPLETE
      ? new CliError(message, EXIT_VALIDATION_INCOMPLETE)
      : new OperationalError(message)
  }
  const tail = out.trimEnd().split("\n").slice(-25).join("\n")
  return new OperationalError(
    `TestFlight deploy failed (unclassified build failure). Last output:\n${tail}`
  )
}

function altoolArgs(ipa: string): readonly string[] {
  return [`-f ${ipa}`, "--type ios", `--apiKey ${ASC_KEY_ID}`, `--apiIssuer ${ASC_ISSUER_ID}`]
}

export function buildValidateApp(ipa: string): readonly string[] {
  return [
    `echo "${ALTOOL_MARKERS.validateBegin}"`,
    `echo "== App Store validation (xcrun altool --validate-app) =="`,
    ["xcrun altool --validate-app", ...altoolArgs(ipa), "2>&1"].join(" "),
    `echo "${ALTOOL_MARKERS.validateOk}"`,
  ]
}

export function buildUploadApp(ipa: string): readonly string[] {
  return [
    `echo "${ALTOOL_MARKERS.uploadBegin}"`,
    `echo "== App Store upload (xcrun altool --upload-app) =="`,
    ["xcrun altool --upload-app", ...altoolArgs(ipa), "2>&1"].join(" "),
  ]
}
