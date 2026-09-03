export interface HealthKitReadOnlyViolation {
  readonly file?: string
  readonly line?: number
  readonly message: string
}

const HEALTHKIT_AUTH_CALL = /requestAuthorization\([^)]*\btoShare\s*:/
const EMPTY_TO_SHARE = /requestAuthorization\(\s*toShare:\s*\[\s*\]\s*,/
const ADDS_UPDATE_USAGE_KEY = /-c\s+"Add\s+:NSHealthUpdateUsageDescription\s+string\b/
const UPDATE_USAGE_KEY = "NSHealthUpdateUsageDescription"

function isComment(line: string): boolean {
  const t = line.trimStart()
  return t.startsWith("//") || t.startsWith("#") || t.startsWith("*")
}

export interface HealthKitScriptScan {
  readonly violations: readonly HealthKitReadOnlyViolation[]
  readonly authorizationSites: number
}

export function scanHealthKitScript(
  file: string,
  source: string,
  disclosureSource: string = source
): HealthKitScriptScan {
  const lines = source.split("\n")
  const violations: HealthKitReadOnlyViolation[] = []

  const sites = lines.flatMap((text, i) =>
    HEALTHKIT_AUTH_CALL.test(text) && !isComment(text) ? [{ text, line: i + 1 }] : []
  )

  for (const { text, line } of sites) {
    if (EMPTY_TO_SHARE.test(text)) continue
    violations.push({
      file,
      line,
      message: `\`requestAuthorization(\` must pass an empty \`toShare: []\` set — a non-empty set requests WRITE access to Health data. Found: ${text.trim()}`,
    })
  }

  const adds = disclosureSource
    .split("\n")
    .some((text) => ADDS_UPDATE_USAGE_KEY.test(text) && !isComment(text))
  if (sites.length > 0 && !adds) {
    const unit =
      disclosureSource === source
        ? "this script requests HealthKit authorization and no line of it ADDS"
        : "this script requests HealthKit authorization and no line of the whole unit it ships as — this file and every other the entry point sources — ADDS"
    violations.push({
      file,
      message: `${unit} \`${UPDATE_USAGE_KEY}\` to the plist. App Store validation keys on the HealthKit ENTITLEMENT rather than on which APIs the code calls, and rejects the upload with error 90683 without the key — even though this app never writes. It is a mandatory disclosure, not a capability; removing the \`Add\` line to "restore least privilege" burns a TestFlight cut (#15990). Naming the key in a comment or in a \`Delete\` does not satisfy this.`,
    })
  }

  return { violations, authorizationSites: sites.length }
}

export function findMissingAuthorizationSite(
  authorizationSites: number
): readonly HealthKitReadOnlyViolation[] {
  if (authorizationSites > 0) return []
  return [
    {
      message:
        "no `requestAuthorization(… toShare: …)` request was found in any shell script in the tree — the read-only pin has nothing to verify. If the call moved, was renamed, or was reformatted onto several lines, update this check; do not delete it.",
    },
  ]
}
