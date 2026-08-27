import { describe, expect, test } from "bun:test"
import { defaultViewData, parseViewDataJSON } from "./view-data"

describe("parseViewDataJSON", () => {
  test("parses valid JSON with all fields", () => {
    const input = JSON.stringify({
      version: 1,
      layout: "table",
      visible_properties: ["name", "status"],
      sorts: [{ field: "name", direction: "asc" }],
      filters: [{ propertyId: "status", operator: "equals", value: "active" }],
      group_by: "status",
      zones: { header: { title: true } },
      pageTypeId: "abc123",
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.layout).toBe("table")
      expect(result.data.visible_properties).toEqual(["name", "status"])
      expect(result.data.sorts).toEqual([{ field: "name", direction: "asc" }])
      expect(result.data.filters).toEqual([
        { propertyId: "status", operator: "equals", value: "active" },
      ])
      expect(result.data.group_by).toBe("status")
      expect(result.data.pageTypeId).toBe("abc123")
      expect(result.data.version).toBe(1)
    }
  })

  test("parses minimal JSON (empty object) with defaults", () => {
    const result = parseViewDataJSON("{}")
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.version).toBe(1)
      expect(result.data.layout).toBeUndefined()
      expect(result.data.sorts).toBeUndefined()
      expect(result.data.filters).toBeUndefined()
    }
  })

  test("returns invalid_json error for malformed JSON", () => {
    const result = parseViewDataJSON("not json{")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("invalid_json")
      expect(result.error.raw).toBe("not json{")
    }
  })

  test("returns validation_failed for invalid schema (bad layout)", () => {
    const result = parseViewDataJSON(JSON.stringify({ layout: "unknown_layout" }))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })

  test("returns validation_failed for non-object input", () => {
    const result = parseViewDataJSON('"just a string"')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })
})

describe("parseViewDataJSON edge cases", () => {
  test("empty string returns invalid_json", () => {
    const result = parseViewDataJSON("")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("invalid_json")
      expect(result.error.raw).toBe("")
    }
  })

  test("whitespace-only string returns invalid_json", () => {
    const result = parseViewDataJSON("   \n\t  ")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("invalid_json")
    }
  })

  test('literal "null" parses as validation_failed (non-object)', () => {
    const result = parseViewDataJSON("null")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })

  test('literal "true" parses as validation_failed (non-object)', () => {
    const result = parseViewDataJSON("true")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })

  test('literal "123" parses as validation_failed (non-object)', () => {
    const result = parseViewDataJSON("123")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })

  test('literal "[]" parses (empty array treated as object with no fields)', () => {
    const result = parseViewDataJSON("[]")
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.version).toBe(1)
    }
  })

  test("unicode and emoji in filter values round-trip correctly", () => {
    const input = JSON.stringify({
      filters: [
        { propertyId: "名前", operator: "equals", value: "🚀 rocket" },
        { propertyId: "emoji_field", operator: "contains", value: "こんにちは 🌸" },
      ],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.filters?.[0]?.propertyId).toBe("名前")
      expect(result.data.filters?.[0]?.value).toBe("🚀 rocket")
      expect(result.data.filters?.[1]?.value).toBe("こんにちは 🌸")
    }
  })

  test("unicode in sort field names round-trips", () => {
    const input = JSON.stringify({
      sorts: [{ field: "日付 📅", direction: "desc" }],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.sorts?.[0]?.field).toBe("日付 📅")
    }
  })

  test("large payload with 100 sorts and 100 filters parses", () => {
    const sorts = Array.from({ length: 100 }, (_, i) => ({
      field: `field_${i}`,
      direction: i % 2 === 0 ? "asc" : "desc",
    }))
    const filters = Array.from({ length: 100 }, (_, i) => ({
      propertyId: `prop_${i}`,
      operator: "equals",
      value: i,
    }))
    const input = JSON.stringify({ sorts, filters })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.sorts).toHaveLength(100)
      expect(result.data.filters).toHaveLength(100)
      expect(result.data.sorts?.[50]?.field).toBe("field_50")
      expect(result.data.filters?.[99]?.propertyId).toBe("prop_99")
    }
  })

  test("sorts array with malformed entry fails validation", () => {
    const input = JSON.stringify({
      sorts: [
        { field: "ok", direction: "asc" },
        { field: 123, direction: "nope" },
      ],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })
})

describe("ViewDataParseError coverage", () => {
  test("type === 'invalid_json' on JSON.parse failure", () => {
    const result = parseViewDataJSON("{not valid")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("invalid_json")
    }
  })

  test("type === 'validation_failed' on Zod schema violation", () => {
    const result = parseViewDataJSON(JSON.stringify({ layout: 42 }))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })

  test("error.raw equals the original input (invalid_json case)", () => {
    const input = "completely broken <<<"
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.raw).toBe(input)
    }
  })

  test("error.raw equals the original input (validation_failed case)", () => {
    const input = JSON.stringify({ layout: "nonsense" })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.raw).toBe(input)
    }
  })

  test("error.message non-empty on invalid_json", () => {
    const result = parseViewDataJSON("???")
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0)
    }
  })

  test("error.message non-empty on validation_failed", () => {
    const result = parseViewDataJSON(JSON.stringify({ layout: "bogus" }))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0)
    }
  })
})

describe("defaultViewData", () => {
  test("returns canonical defaults including the three page-size fields", () => {
    const data = defaultViewData()
    expect(data.version).toBe(1)
    expect(data.page_size).toBe(12)
    expect(data.group_page_size).toBe(6)
    expect(data.item_page_size).toBe(12)
  })

  test("each call returns an independent object (no shared reference)", () => {
    const a = defaultViewData()
    const b = defaultViewData()
    expect(a).not.toBe(b)
    a.page_size = 999
    expect(b.page_size).toBe(12)
  })
})
