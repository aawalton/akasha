import { describe, expect, test } from "bun:test"
import { bodyPropertyIsContentTier } from "./content-tier"
import { parsePageTypeData } from "./pages"

describe("bodyPropertyIsContentTier", () => {
  test("true when the body property is declared storage: content", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown", storage: "content" }],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(true)
  })

  test("false when the body property is explicitly indexed", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown", storage: "indexed" }],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })

  test("false when the body property declares no storage tier (indexed default)", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown" }],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })

  test("false for the reserved external tier (no routing target yet)", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown", storage: "external" }],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })

  test("false when no detailConfig is declared", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown", storage: "content" }],
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })

  test("false when bodyPropertyId names no property definition", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "other", title: "Other", type: "text" }],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })

  test("a content-tier property that is NOT the body does not flip the gate", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [
        { id: "text", title: "Text", type: "markdown" },
        { id: "notes", title: "Notes", type: "markdown", storage: "content" },
      ],
      detailConfig: { display: "reader", bodyPropertyId: "text" },
    })
    expect(bodyPropertyIsContentTier(data)).toBe(false)
  })
})
