import { describe, expect, test } from "bun:test"
import {
  assertSheetEntriesConform,
  parseSheetEntryTemplate,
  type SheetEntryTemplate,
  SheetEntryTemplateError,
  SheetEntryTemplateSchema,
  validateSheetEntries,
} from "./sheet-template"

const TEMPLATE: SheetEntryTemplate = SheetEntryTemplateSchema.parse({
  standards: [
    {
      class: "item",
      path: "equipment",
      textField: "description",
      labelField: "name",
      maxLength: 40,
      requireText: true,
    },
    { class: "attribute note", path: "attrInfo", maxLength: 30 },
  ],
})

describe("validateSheetEntries — length rule", () => {
  test("an over-cap description is a length violation naming the entry", () => {
    const root = {
      equipment: [{ name: "Iron Sword", description: "x".repeat(41) }],
    }
    const violations = validateSheetEntries(root, TEMPLATE)
    expect(violations).toHaveLength(1)
    expect(violations[0]).toMatchObject({ standard: "item", entry: "Iron Sword", rule: "length" })
    expect(violations[0]?.message).toMatch(/41/)
  })

  test("an at-cap description passes (boundary is inclusive)", () => {
    const root = { equipment: [{ name: "Iron Sword", description: "x".repeat(40) }] }
    expect(validateSheetEntries(root, TEMPLATE)).toHaveLength(0)
  })

  test("a record-of-strings entry over cap is flagged with its key as the label", () => {
    const root = { attrInfo: { strength: "y".repeat(31) } }
    const violations = validateSheetEntries(root, TEMPLATE)
    expect(violations).toHaveLength(1)
    expect(violations[0]).toMatchObject({
      standard: "attribute note",
      entry: "strength",
      rule: "length",
    })
  })
})

describe("validateSheetEntries — required rule", () => {
  test("a missing required text is a required violation", () => {
    const root = { equipment: [{ name: "Bare Fists" }] }
    const violations = validateSheetEntries(root, TEMPLATE)
    expect(violations).toHaveLength(1)
    expect(violations[0]).toMatchObject({ standard: "item", entry: "Bare Fists", rule: "required" })
  })

  test("an empty/whitespace required text is a required violation", () => {
    const root = { equipment: [{ name: "Bare Fists", description: "   " }] }
    const violations = validateSheetEntries(root, TEMPLATE)
    expect(violations).toHaveLength(1)
    expect(violations[0]).toMatchObject({ rule: "required" })
  })

  test("a present, within-cap required text passes", () => {
    const root = { equipment: [{ name: "Iron Sword", description: "A plain soldier's blade." }] }
    expect(validateSheetEntries(root, TEMPLATE)).toHaveLength(0)
  })
})

describe("validateSheetEntries — path resolution & opt-in", () => {
  test("a path that does not resolve to a container is skipped, not a violation", () => {
    const root = { turn: 5, hud: { level: 3 } }
    expect(validateSheetEntries(root, TEMPLATE)).toHaveLength(0)
  })

  test("a path resolving to a scalar (not a container) is skipped", () => {
    const root = { equipment: "not a container", attrInfo: 7 }
    expect(validateSheetEntries(root, TEMPLATE)).toHaveLength(0)
  })

  test("an empty template validates nothing", () => {
    const root = { equipment: [{ name: "X", description: "z".repeat(999) }] }
    expect(validateSheetEntries(root, SheetEntryTemplateSchema.parse({}))).toHaveLength(0)
  })
})

describe("validateSheetEntries — one pass, all violations", () => {
  test("multiple offending entries across standards are all reported in one pass", () => {
    const root = {
      equipment: [{ name: "Overlong", description: "x".repeat(50) }, { name: "Missing" }],
      attrInfo: { strength: "y".repeat(40) },
    }
    const violations = validateSheetEntries(root, TEMPLATE)
    expect(violations).toHaveLength(3)
    expect(violations.map((v) => v.rule).sort()).toEqual(["length", "length", "required"])
  })
})

describe("assertSheetEntriesConform", () => {
  test("throws SheetEntryTemplateError naming every violation on a non-conforming root", () => {
    const root = { equipment: [{ name: "Overlong", description: "x".repeat(80) }] }
    let caught: unknown
    try {
      assertSheetEntriesConform(root, TEMPLATE)
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(SheetEntryTemplateError)
    if (!(caught instanceof SheetEntryTemplateError))
      throw new Error("expected SheetEntryTemplateError")
    expect(caught.violations).toHaveLength(1)
    expect(caught.message).toMatch(/Overlong/)
    expect(caught.message).toMatch(/length/)
  })

  test("does not throw on a conforming root", () => {
    const root = { equipment: [{ name: "Iron Sword", description: "A plain blade." }] }
    expect(() => assertSheetEntriesConform(root, TEMPLATE)).not.toThrow()
  })
})

describe("SheetEntryTemplateSchema — strictness (Boundary Parsing)", () => {
  test("rejects an unknown top-level key", () => {
    expect(() => SheetEntryTemplateSchema.parse({ standards: [], extra: 1 })).toThrow()
  })

  test("rejects an unknown key on a standard", () => {
    expect(() =>
      SheetEntryTemplateSchema.parse({ standards: [{ class: "x", path: "y", bogus: true }] })
    ).toThrow()
  })

  test("rejects a non-positive maxLength", () => {
    expect(() =>
      SheetEntryTemplateSchema.parse({ standards: [{ class: "x", path: "y", maxLength: 0 }] })
    ).toThrow()
  })
})

describe("parseSheetEntryTemplate — opt-in boundary", () => {
  test("returns null on an absent (undefined/null) value", () => {
    expect(parseSheetEntryTemplate(undefined)).toBeNull()
    expect(parseSheetEntryTemplate(null)).toBeNull()
  })

  test("returns null on a non-object value", () => {
    expect(parseSheetEntryTemplate("nope")).toBeNull()
    expect(parseSheetEntryTemplate(42)).toBeNull()
  })

  test("parses a present template", () => {
    const parsed = parseSheetEntryTemplate({ standards: [{ class: "item", path: "equipment" }] })
    expect(parsed?.standards).toHaveLength(1)
  })
})
