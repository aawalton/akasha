import { describe, expect, test } from "bun:test"
import { parseQuickAddConfig } from "./quick-add"

describe("parseQuickAddConfig", () => {
  test("returns null for undefined input", () => {
    expect(parseQuickAddConfig(undefined)).toBeNull()
  })

  test("returns null for null input", () => {
    expect(parseQuickAddConfig(null)).toBeNull()
  })

  test("returns null for string input", () => {
    expect(parseQuickAddConfig("not-an-object")).toBeNull()
  })

  test("returns null for array input", () => {
    expect(parseQuickAddConfig([])).toBeNull()
  })

  test("returns null for number input", () => {
    expect(parseQuickAddConfig(42)).toBeNull()
  })

  test("parses the project's expected config", () => {
    const raw = {
      titlePropertyId: "title",
      notesPropertyId: "notes",
      inlineTokens: [
        {
          sigil: "@",
          propertyId: "tags",
          autocompleteFrom: { kind: "self-property" },
          defaults: ["inbox"],
        },
      ],
      pickers: [{ propertyId: "status", defaultValue: "exploration" }],
      fixedDefaults: { sortOrder: 0 },
    }
    const result = parseQuickAddConfig(raw)
    expect(result).toMatchObject({
      titlePropertyId: "title",
      notesPropertyId: "notes",
      inlineTokens: [
        {
          sigil: "@",
          propertyId: "tags",
          autocompleteFrom: { kind: "self-property" },
          defaults: ["inbox"],
        },
      ],
      pickers: [{ propertyId: "status", defaultValue: "exploration" }],
      fixedDefaults: { sortOrder: 0 },
    })
  })

  test("parses a title-only config", () => {
    const result = parseQuickAddConfig({ titlePropertyId: "title" })
    expect(result).toEqual({ titlePropertyId: "title" })
  })

  test("returns null for unknown top-level keys (.strict())", () => {
    const result = parseQuickAddConfig({
      titlePropertyId: "title",
      bogusKey: "nope",
    })
    expect(result).toBeNull()
  })

  test("returns null for unknown keys inside an inlineTokens[] entry", () => {
    const result = parseQuickAddConfig({
      titlePropertyId: "title",
      inlineTokens: [{ sigil: "@", propertyId: "tags", bogus: true }],
    })
    expect(result).toBeNull()
  })

  test("returns null for a sigil outside @ / #", () => {
    const result = parseQuickAddConfig({
      titlePropertyId: "title",
      inlineTokens: [{ sigil: "$", propertyId: "tags" }],
    })
    expect(result).toBeNull()
  })

  test("returns null for autocompleteFrom: { kind: 'unknown' }", () => {
    const result = parseQuickAddConfig({
      titlePropertyId: "title",
      inlineTokens: [
        {
          sigil: "@",
          propertyId: "tags",
          autocompleteFrom: { kind: "unknown" },
        },
      ],
    })
    expect(result).toBeNull()
  })

  test("parses a literal-source token", () => {
    const result = parseQuickAddConfig({
      titlePropertyId: "title",
      inlineTokens: [
        {
          sigil: "@",
          propertyId: "tags",
          autocompleteFrom: { kind: "literal", values: ["inbox", "todo"] },
        },
      ],
    })
    expect(result).toMatchObject({
      titlePropertyId: "title",
      inlineTokens: [
        {
          sigil: "@",
          propertyId: "tags",
          autocompleteFrom: { kind: "literal", values: ["inbox", "todo"] },
        },
      ],
    })
  })
})
