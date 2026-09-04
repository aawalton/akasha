import { describe, expect, test } from "bun:test"
import {
  ALTOOL_MARKERS,
  altoolStepFailed,
  buildUploadApp,
  buildValidateApp,
  classifyAltoolFailure,
  EXIT_VALIDATION_INCOMPLETE,
  extractAppStoreVerdict,
  testflightFailureError,
} from "./altool.module.code.ts"

const REJECTION_STDOUT = "Failed to validate package."

const REJECTION_STDERR = `Running altool at path '/Applications/Xcode.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-07-25 03:32:19.253 ERROR: [ContentDelivery.Uploader.8DAC50540]
=======================================
VERIFY FAILED with 1 error
=======================================
2026-07-25 03:32:19.254 ERROR: [altool.8DAC50540] Missing purpose string in Info.plist. Your app's code references one or more APIs that access sensitive user data, or the app has one or more entitlements that permit such access. The Info.plist file for the "App.app" bundle should contain a NSHealthUpdateUsageDescription key with a user-facing purpose string explaining clearly and completely why your app needs the data. If you're using external libraries or SDKs, they may reference APIs that require a purpose string. While your app might not use these APIs, a purpose string is still required. For details, visit: https://developer.apple.com/documentation/uikit/protecting_the_user_s_privacy/requesting_access_to_protected_resources. (90683) The server's response was: '{
    code = 90683;
    description = "Missing purpose string in Info.plist.";
}'.
   NSUnderlyingError : A server error occurred. (-19241)
      code : 90683
      description : Missing purpose string in Info.plist. Your app's code references one or more APIs that access sensitive user data, or the app has one or more entitlements that permit such access.
   iris-code : 90683
2026-07-25 03:32:19.256 ERROR: [altool.1034E6A70] ExitFailure (31)`

const REJECTION_FOLDED = `${ALTOOL_MARKERS.validateBegin}\n${REJECTION_STDERR}\n${REJECTION_STDOUT}`

const UNREACHABLE_FOLDED = `${ALTOOL_MARKERS.validateBegin}
Running altool at path '/Applications/Xcode.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-07-25 03:54:51.534 ERROR: [altool.10504AA70] Failed to load AuthKey file. (-43) The file 'AuthKey_ZZZZZZZZZZ.p8' could not be found in any of these locations: '~/private_keys', '~/.private_keys', '~/.appstoreconnect/private_keys'.`

describe("extractAppStoreVerdict", () => {
  test("lifts Apple's code + description from real altool output", () => {
    const verdict = extractAppStoreVerdict(REJECTION_FOLDED)
    expect(verdict?.code).toBe(90683)
    expect(verdict?.description).toContain("Missing purpose string in Info.plist")
  })

  test("returns undefined when there is no verdict to lift", () => {
    expect(
      extractAppStoreVerdict("Unable to reach the App Store. Try again later.")
    ).toBeUndefined()
  })
})

describe("classifyAltoolFailure", () => {
  test("real 90683 output → MISSING_PURPOSE_STRING naming the key, the seam, and the escape hatch", () => {
    const failure = classifyAltoolFailure(REJECTION_FOLDED)
    expect(failure.failureClass).toBe("MISSING_PURPOSE_STRING")
    expect(failure.remediation).toContain("NSHealthUpdateUsageDescription")
    expect(failure.remediation).toContain("apply-ios-seam.sh")
    expect(failure.remediation).toContain("NATIVE_SHELL_HEALTHKIT=0")
    expect(failure.exitCode).toBe(3)
  })

  test("the remediation states the rule that made the true statement false", () => {
    const { remediation } = classifyAltoolFailure(REJECTION_FOLDED)
    expect(remediation).toContain("ENTITLEMENT")
    expect(remediation).toContain("no read-only variant")
  })

  test("an unrecognized Apple code passes APPLE's own description through", () => {
    const failure = classifyAltoolFailure(
      "ERROR: something went wrong (90062)\n      description : The bundle version must be higher than the previously uploaded version.\n   iris-code : 90062"
    )
    expect(failure.failureClass).toBe("APP_STORE_VALIDATION_REJECTED")
    expect(failure.remediation).toContain("90062")
    expect(failure.remediation).toContain("must be higher than the previously uploaded version")
    expect(failure.exitCode).toBe(3)
  })

  test("VERIFY FAILED with no parseable code is still reported as a rejection", () => {
    const failure = classifyAltoolFailure("VERIFY FAILED with 1 error\nsomething unparseable")
    expect(failure.failureClass).toBe("APP_STORE_VALIDATION_REJECTED")
    expect(failure.exitCode).toBe(3)
  })

  test("real bad-credentials output → VALIDATION_UNREACHABLE, own exit code, never a pass", () => {
    const failure = classifyAltoolFailure(UNREACHABLE_FOLDED)
    expect(failure.failureClass).toBe("VALIDATION_UNREACHABLE")
    expect(failure.exitCode).toBe(EXIT_VALIDATION_INCOMPLETE)
    expect(failure.exitCode).not.toBe(3)
    expect(failure.remediation).toContain("UNVALIDATED")
    expect(failure.remediation).toContain("not evidence the build would pass")
  })

  test("the `(-43)` in real unreachable output is not mistaken for an Apple error code", () => {
    expect(extractAppStoreVerdict(UNREACHABLE_FOLDED)).toBeUndefined()
  })

  test("a network failure is unreachable too, not a rejection", () => {
    const failure = classifyAltoolFailure(
      "Error Domain=NSURLErrorDomain Code=-1009 'The Internet connection appears to be offline.'"
    )
    expect(failure.failureClass).toBe("VALIDATION_UNREACHABLE")
    expect(failure.exitCode).toBe(EXIT_VALIDATION_INCOMPLETE)
  })
})

describe("altoolStepFailed", () => {
  test("BEGIN without OK → the altool step is the failing one", () => {
    expect(altoolStepFailed(REJECTION_FOLDED)).toBe(true)
  })

  test("BEGIN with OK → validation completed, not the failing step", () => {
    expect(
      altoolStepFailed(`${ALTOOL_MARKERS.validateBegin}\nok\n${ALTOOL_MARKERS.validateOk}`)
    ).toBe(false)
  })

  test("an archive failure that never reached altool is NOT an altool failure", () => {
    expect(altoolStepFailed("** ARCHIVE FAILED **\nerror: no such module 'Capacitor'")).toBe(false)
  })
})

describe("testflightFailureError", () => {
  test("a real 90683 rejection becomes a typed operational error", () => {
    const err = testflightFailureError(REJECTION_FOLDED)
    expect(err.code).toBe(3)
    expect(err.message).toContain("MISSING_PURPOSE_STRING")
    expect(err.message).toContain("NSHealthUpdateUsageDescription")
  })

  test("signing failures still classify first and are unchanged", () => {
    const err = testflightFailureError("ASC_PERMISSION_DENIED: /v1/profiles 403")
    expect(err.code).toBe(3)
    expect(err.message).toContain("ASC_PERMISSION_DENIED")
  })

  test("an unreachable validation carries exit 4, not the operational 3", () => {
    const err = testflightFailureError(UNREACHABLE_FOLDED)
    expect(err.code).toBe(EXIT_VALIDATION_INCOMPLETE)
    expect(err.message).toContain("VALIDATION_UNREACHABLE")
  })

  test("an unclassified build failure still falls back to the raw tail", () => {
    const err = testflightFailureError("** ARCHIVE FAILED **\nerror: undefined symbol _main")
    expect(err.code).toBe(3)
    expect(err.message).toContain("unclassified build failure")
    expect(err.message).toContain("undefined symbol _main")
  })

  test("no runtime message names an internal project number", () => {
    for (const out of [REJECTION_FOLDED, `${ALTOOL_MARKERS.validateBegin}\noffline`]) {
      expect(testflightFailureError(out).message).not.toMatch(/#\d{4,}/)
    }
  })
})

describe("shell builders", () => {
  test("validate folds stderr into stdout — the whole point of the durable-log fix", () => {
    const lines = buildValidateApp("build/export/App.ipa")
    const command = lines.find((l) => l.startsWith("xcrun altool"))
    expect(command).toContain("--validate-app")
    expect(command).toContain("2>&1")
    expect(command).toContain("-f build/export/App.ipa")
  })

  test("upload folds stderr too, so upload failures are logged on the same terms", () => {
    const command = buildUploadApp("build/export/App.ipa").find((l) => l.startsWith("xcrun altool"))
    expect(command).toContain("--upload-app")
    expect(command).toContain("2>&1")
  })

  test("validate brackets its command with the BEGIN and OK markers", () => {
    const lines = buildValidateApp("x.ipa")
    expect(lines[0]).toContain(ALTOOL_MARKERS.validateBegin)
    expect(lines.at(-1)).toContain(ALTOOL_MARKERS.validateOk)
    expect(lines.findIndex((l) => l.startsWith("xcrun altool"))).toBeGreaterThan(0)
  })

  test("neither builder puts a secret on the command line — only the key/issuer ids", () => {
    for (const line of [...buildValidateApp("x.ipa"), ...buildUploadApp("x.ipa")]) {
      expect(line).not.toContain("BEGIN PRIVATE KEY")
      expect(line).not.toContain(".p8")
    }
  })
})
