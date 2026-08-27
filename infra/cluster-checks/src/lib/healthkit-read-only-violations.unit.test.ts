import { describe, expect, test } from "bun:test"
import { findMissingAuthorizationSite, scanHealthKitScript } from "./healthkit-read-only-violations.ts"

const SEAM = `
# NSHealthUpdateUsageDescription is a mandatory disclosure, not a capability.
HEALTH_UPDATE_DESC="alanwalton does not add any data to the Health app."
if [[ "$HEALTHKIT_ENABLED" == "1" ]]; then
  "$PB" -c "Delete :NSHealthUpdateUsageDescription" "$PLIST" 2>/dev/null || true
  "$PB" -c "Add :NSHealthUpdateUsageDescription string \${HEALTH_UPDATE_DESC}" "$PLIST"
  echo "OK: NSHealthUpdateUsageDescription applied to $PLIST"
else
  "$PB" -c "Delete :NSHealthUpdateUsageDescription" "$PLIST" 2>/dev/null || true
fi
        try? await store.requestAuthorization(toShare: [], read: [quantityType])
`

const scan = (source: string) => scanHealthKitScript("seam.sh", source)

const lineOf = (source: string, needle: string): number =>
  source.split("\n").findIndex((l) => l.includes(needle)) + 1

describe("scanHealthKitScript", () => {
  test("clean seam yields no violations and one authorization site", () => {
    expect(scan(SEAM)).toEqual({ violations: [], authorizationSites: 1 })
  })

  test("a non-empty toShare set is a violation — this is the regression that matters", () => {
    const bad = SEAM.replace("toShare: []", "toShare: [quantityType]")
    const v = scan(bad).violations
    expect(v).toHaveLength(1)
    expect(v[0]?.message).toContain("WRITE access")
    expect(v[0]?.file).toBe("seam.sh")
    expect(v[0]?.line).toBe(lineOf(bad, "requestAuthorization("))
  })

  test("tolerates internal whitespace in an empty toShare set", () => {
    expect(scan(SEAM.replace("toShare: []", "toShare:  [ ]")).violations).toEqual([])
  })

  test("deleting the Add line is a violation, though the key is still named", () => {
    const bad = SEAM.split("\n")
      .filter((l) => !l.includes(`-c "Add :NSHealthUpdateUsageDescription`))
      .join("\n")
    expect(bad).toContain("NSHealthUpdateUsageDescription")
    const v = scan(bad).violations
    expect(v).toHaveLength(1)
    expect(v[0]?.message).toContain("90683")
    expect(v[0]?.file).toBe("seam.sh")
    expect(v[0]?.line).toBeUndefined()
  })

  test("an Add commented out does not satisfy the disclosure", () => {
    const bad = SEAM.replace('  "$PB" -c "Add :', '  # "$PB" -c "Add :')
    expect(scan(bad).violations).toHaveLength(1)
  })

  test("a script asking for nothing owes no usage key", () => {
    const other = `#!/usr/bin/env bash\necho "no health here"\n`
    expect(scan(other)).toEqual({ violations: [], authorizationSites: 0 })
  })

  test("a notification authorization request is not a HealthKit site", () => {
    const notifications = `  center.requestAuthorization(options: [.alert, .badge]) { _, _ in }\n`
    expect(scan(notifications)).toEqual({ violations: [], authorizationSites: 0 })
  })

  test("a commented-out call is not a site", () => {
    const bad = SEAM.replace("        try? await store.", "        // try? await store.")
    expect(scan(bad).authorizationSites).toBe(0)
  })
})

describe("findMissingAuthorizationSite", () => {
  test("no site anywhere in the corpus is a violation, not a pass", () => {
    const v = findMissingAuthorizationSite(0)
    expect(v).toHaveLength(1)
    expect(v[0]?.file).toBeUndefined()
    expect(v[0]?.message).toContain("nothing to verify")
  })

  test("one site anywhere is enough", () => {
    expect(findMissingAuthorizationSite(1)).toEqual([])
  })
})
