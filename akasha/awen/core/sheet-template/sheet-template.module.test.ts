import { describe, expect, test } from "bun:test"
import {
  assertSheetEntriesConform,
  parseSheetEntryTemplate,
  SheetEntryTemplateError,
  validateSheetEntries,
} from "./sheet-template.module.code.ts"

const TEMPLATE = {
  standards: [
    {
      class: "skill",
      path: "skills",
      textField: "description",
      labelField: "name",
      maxLength: 10,
      requireText: true,
    },
  ],
}

describe("parseSheetEntryTemplate", () => {
  test("nothing given is nothing back", () => {
    expect(parseSheetEntryTemplate(null)).toBe(null)
    expect(parseSheetEntryTemplate("skills")).toBe(null)
  })

  test("standards default to none", () => {
    expect(parseSheetEntryTemplate({})?.standards).toEqual([])
  })
})

describe("validateSheetEntries", () => {
  test("a conforming sheet has nothing against it", () => {
    const sheet = { skills: [{ name: "Cut", description: "short" }] }
    expect(validateSheetEntries(sheet, TEMPLATE)).toEqual([])
  })

  test("a standard whose path the sheet does not hold checks nothing", () => {
    expect(validateSheetEntries({ other: [] }, TEMPLATE)).toEqual([])
  })

  test("an entry over the cap is reported for its length", () => {
    const sheet = { skills: [{ name: "Cut", description: "far too long to fit" }] }
    const found = validateSheetEntries(sheet, TEMPLATE)
    expect(found).toHaveLength(1)
    expect(found[0]?.rule).toBe("length")
    expect(found[0]?.entry).toBe("Cut")
  })

  test("an entry missing its required text is not also weighed for length", () => {
    const sheet = { skills: [{ name: "Cut", description: "   " }] }
    const found = validateSheetEntries(sheet, TEMPLATE)
    expect(found).toHaveLength(1)
    expect(found[0]?.rule).toBe("required")
  })

  test("an entry with no label falls back to its position", () => {
    const sheet = { skills: [{ description: "far too long to fit" }] }
    expect(validateSheetEntries(sheet, TEMPLATE)[0]?.entry).toBe("0")
  })

  test("a nested path is walked segment by segment", () => {
    const nested = {
      standards: [{ class: "talent", path: "sheet.talents", requireText: true }],
    }
    const sheet = { sheet: { talents: ["known", ""] } }
    const found = validateSheetEntries(sheet, nested)
    expect(found).toHaveLength(1)
    expect(found[0]?.entry).toBe("1")
  })

  test("a record container is walked by its keys", () => {
    const byKey = {
      standards: [{ class: "bond", path: "bonds", textField: "note", requireText: true }],
    }
    const sheet = { bonds: { aria: { note: "" } } }
    expect(validateSheetEntries(sheet, byKey)[0]?.entry).toBe("aria")
  })
})

describe("assertSheetEntriesConform", () => {
  test("says nothing about a conforming sheet", () => {
    const sheet = { skills: [{ name: "Cut", description: "short" }] }
    expect(assertSheetEntriesConform(sheet, TEMPLATE)).toBe(undefined)
  })

  test("throws carrying every violation", () => {
    const sheet = { skills: [{ name: "Cut", description: "far too long to fit" }] }
    try {
      assertSheetEntriesConform(sheet, TEMPLATE)
      throw new Error("expected a throw")
    } catch (err) {
      expect(err).toBeInstanceOf(SheetEntryTemplateError)
      expect((err as SheetEntryTemplateError).violations).toHaveLength(1)
    }
  })
})
