import { describe, expect, test } from "bun:test"
import {
  extractIntentStrings,
  findAppIntentBrandWordViolations,
} from "./app-intent-brand-word-violations.ts"

const OK = `
# The associated-domains entitlement plus a hosted apple-app-site-association route.
  bs["CODE_SIGN_IDENTITY"] = "Apple Distribution"
  "$PB" -c "Delete :com.apple.developer.healthkit" "$ENTITLEMENTS_DEST"
echo "Apple ID signing team, plug in the iPhone, and Run."

// Reads today's Apple Health Active Energy total and POSTs it to the fleet as the day's active
// calories, with NO app session — see /Applications/Xcode.app for the toolchain.
struct SyncActiveEnergyIntent: AppIntent {
    static var title: LocalizedStringResource = "Sync Active Energy"
    static var description = IntentDescription(
        "Reads today's Health Active Energy total and sends it to alanwalton.com as the day's active calories."
    )
    private static let endpoint = URL(string: "https://alanwalton.com/api/tracking/active-energy")!
}
        AppShortcut(
            intent: SyncActiveEnergyIntent(),
            phrases: ["Sync \\(.applicationName) active energy"],
            shortTitle: "Sync Active Energy",
            systemImageName: "flame"
        )
`

describe("findAppIntentBrandWordViolations", () => {
  test("a clean seam yields no violations", () => {
    expect(findAppIntentBrandWordViolations(OK)).toEqual([])
  })

  test('"Apple Health" in an IntentDescription is a violation', () => {
    const bad = OK.replace("today's Health Active", "today's Apple Health Active")
    const v = findAppIntentBrandWordViolations(bad)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("ITMS-90626")
    expect(v[0]?.detail).toContain("Apple Health")
  })

  test("the violation names the literal's line, not the construct's or the comment's", () => {
    const bad = OK.replace("today's Health Active", "today's Apple Health Active")
    const lines = bad.split("\n")
    const literalLine = lines.findIndex((l) => l.includes("\"Reads today's Apple Health")) + 1
    const commentLine = lines.findIndex((l) => l.includes("// Reads today's Apple Health")) + 1
    expect(commentLine).toBeGreaterThan(0)
    expect(commentLine).not.toBe(literalLine)
    expect(findAppIntentBrandWordViolations(bad)[0]?.line).toBe(literalLine)
  })

  test.each([
    "title",
    "shortTitle",
    "phrases",
  ] as const)("the %s surface is covered too — Apple reads all Siri-facing metadata", (surface) => {
    const needle = surface === "phrases" ? "Sync \\(" : '"Sync Active Energy"'
    const replacement = surface === "phrases" ? "Apple sync \\(" : '"Sync Apple Active Energy"'
    const v = findAppIntentBrandWordViolations(OK.replaceAll(needle, replacement))
    expect(v.length).toBeGreaterThanOrEqual(1)
    expect(v.every((x) => x.detail.includes("ITMS-90626"))).toBe(true)
  })

  test.each([
    ['a Swift // comment saying "Apple Health"', "// Reads today's Apple Health"],
    ["the CODE_SIGN_IDENTITY build setting", "Apple Distribution"],
    ["a shell # comment", "apple-app-site-association"],
    ["a reverse-DNS entitlement key", "com.apple.developer.healthkit"],
    ["an echo string", "Apple ID signing team"],
    ["an Xcode path", "/Applications/Xcode.app"],
  ])("%s is not a violation", (_name, fragment) => {
    expect(OK).toContain(fragment)
    expect(findAppIntentBrandWordViolations(OK)).toEqual([])
  })

  test("a URL containing // inside a literal does not derail comment handling", () => {
    expect(extractIntentStrings(OK).some((s) => s.surface === "shortTitle")).toBe(true)
  })

  test("\\(.applicationName) interpolation is a near-miss, not a hit", () => {
    const phrases = extractIntentStrings(OK).filter((s) => s.surface === "phrases")
    expect(phrases).toHaveLength(1)
    expect(phrases[0]?.text).toContain(".applicationName")
    expect(findAppIntentBrandWordViolations(OK)).toEqual([])
  })

  test("all four surfaces are extracted from a clean seam", () => {
    const surfaces = new Set(extractIntentStrings(OK).map((s) => s.surface))
    expect([...surfaces].sort()).toEqual(["IntentDescription", "phrases", "shortTitle", "title"])
  })

  test("no IntentDescription at all is a violation, not a pass", () => {
    const bad = OK.replace("IntentDescription(", "IntentDesc(")
    const v = findAppIntentBrandWordViolations(bad)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("IntentDescription")
  })

  test("a commented-out IntentDescription does not satisfy the extractor", () => {
    const bad = OK.replace(
      "    static var description = IntentDescription(",
      "    // static var description = IntentDescription("
    )
    const v = findAppIntentBrandWordViolations(bad)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("IntentDescription")
  })
})

const LIVE_DESCRIPTION =
  "\"Reads today's Health Active Energy total and sends it to alanwalton.com as the day's active calories.\""

describe("every quoting form Swift admits", () => {
  const withDescription = (literal: string) => `
struct SyncActiveEnergyIntent: AppIntent {
    static var title: LocalizedStringResource = "Sync Active Energy"
    static var description = IntentDescription(
        ${literal}
    )
}
`

  const FORMS: readonly [string, string, string][] = [
    ["single-line", "\"Reads today's ", ' Active Energy total."'],
    ["multiline", '"""\n        Reads today\'s ', ' Active Energy total.\n        """'],
    ["raw single-line", "#\"Reads today's ", ' Active Energy total."#'],
    ["raw multiline", '#"""\n        Reads today\'s ', ' Active Energy total.\n        """#'],
    ["raw with two hashes", "##\"Reads today's ", ' Active Energy total."##'],
  ]

  test.each(FORMS)("a %s description carrying the brand word is a violation", (_f, head, tail) => {
    const v = findAppIntentBrandWordViolations(withDescription(`${head}Apple Health${tail}`))
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("ITMS-90626")
    expect(v[0]?.detail).toContain("Apple Health")
  })

  test.each(FORMS)("a clean %s description is not a violation", (_f, head, tail) => {
    expect(findAppIntentBrandWordViolations(withDescription(`${head}Health${tail}`))).toEqual([])
  })

  test("a multiline literal ends at its own delimiter, not at a quote inside it", () => {
    const strings = extractIntentStrings(
      withDescription('"""\n        Reads what "Health" calls active energy.\n        """')
    )
    expect(strings.find((s) => s.surface === "IntentDescription")?.text).toContain('"Health"')
  })

  test('a shell comment beginning #" does not swallow the seam after it', () => {
    const seam = `#"$PB" -c "Print :CFBundleVersion" "$PLIST"\n${OK}`
    expect(findAppIntentBrandWordViolations(seam)).toEqual([])
    expect(extractIntentStrings(seam).some((s) => s.surface === "IntentDescription")).toBe(true)
  })
})

describe("the emptiness guard", () => {
  test.each([
    ["empty", '""'],
    ["whitespace only", '"   "'],
  ])("an IntentDescription extracting as %s is not evidence one was read", (_f, literal) => {
    const v = findAppIntentBrandWordViolations(OK.replace(LIVE_DESCRIPTION, literal))
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("IntentDescription")
  })

  test("a seam holding no App Intent at all refuses rather than reporting clean", () => {
    const v = findAppIntentBrandWordViolations(
      OK.replace("struct SyncActiveEnergyIntent: AppIntent {", "struct SyncActiveEnergyIntent {")
    )
    expect(v.length).toBeGreaterThanOrEqual(1)
    expect(v.some((x) => x.detail.includes("AppIntent"))).toBe(true)
  })
})

describe("the guard is derived per construct, not counted per file", () => {
  const THIRD_INTENT = `
@available(iOS 16.0, *)
struct SyncSleepIntent: AppIntent {
    private static let blurb = "Reads today's Apple Health sleep totals and sends them on."
    static var title: LocalizedStringResource = "Sync Sleep"
    static var description = IntentDescription(blurb)
    static var openAppWhenRun: Bool = false
}
`

  test("an added intent whose description cannot be read refuses, though the others can", () => {
    expect(findAppIntentBrandWordViolations(OK)).toEqual([])

    const v = findAppIntentBrandWordViolations(THIRD_INTENT + OK)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("IntentDescription")
  })

  test("an App Shortcut whose phrases cannot be read refuses", () => {
    const bad = OK.replace(
      'phrases: ["Sync \\(.applicationName) active energy"],',
      "phrases: list,"
    )
    const v = findAppIntentBrandWordViolations(bad)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("phrases")
  })

  test("every construct in a readable seam yields its surfaces", () => {
    expect(findAppIntentBrandWordViolations(OK)).toEqual([])
  })
})

describe("every way a surface can be bound", () => {
  const withTitle = (binding: string) => `
struct SyncActiveEnergyIntent: AppIntent {
    ${binding}
    static var description = IntentDescription("Sends the day's active energy total.")
}
`

  const BINDINGS: readonly [string, string, string][] = [
    ["annotated assignment", "static var title: LocalizedStringResource = ", ""],
    ["unannotated initialiser", "static var title = LocalizedStringResource(", ")"],
    ["computed property on one line", "static var title: LocalizedStringResource { ", " }"],
    [
      "computed property over several lines",
      "static var title: LocalizedStringResource {\n        ",
      "\n    }",
    ],
  ]

  test.each(BINDINGS)("a title bound by %s is scanned", (_f, head, tail) => {
    const v = findAppIntentBrandWordViolations(withTitle(`${head}"Apple Health Sync"${tail}`))
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("App Intent title")
  })

  test.each(BINDINGS)("a clean title bound by %s is not a violation", (_f, head, tail) => {
    expect(findAppIntentBrandWordViolations(withTitle(`${head}"Sync Energy"${tail}`))).toEqual([])
  })

  test("a phrases array spread over several lines is scanned whole", () => {
    const seam = `
struct S: AppIntent {
    static var title: LocalizedStringResource = "Sync"
    static var description = IntentDescription("Sends the day's total.")
}
        AppShortcut(
            intent: SyncActiveEnergyIntent(),
            phrases: [
                "Sync \\(.applicationName) active energy",
                "Sync my Apple Health energy with \\(.applicationName)",
            ],
            shortTitle: "Sync Active Energy"
        )
`
    const v = findAppIntentBrandWordViolations(seam)
    expect(v).toHaveLength(1)
    expect(v[0]?.detail).toContain("App Intent phrases")
  })
})
