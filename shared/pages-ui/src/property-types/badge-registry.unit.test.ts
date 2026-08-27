import { describe, expect, it } from "bun:test"
import { propertyBadgeRegistry } from "./badge-registry"

const ALL_PROPERTY_TYPES = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "path-select",
  "calendar-date",
  "calendar-time",
  "instant",
  "boolean",
  "url",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "json",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
] as const

describe("propertyBadgeRegistry exhaustiveness", () => {
  it("has an entry for every PropertyType literal (21 total)", () => {
    const registryKeys = Object.keys(propertyBadgeRegistry).sort()
    const expectedKeys = [...ALL_PROPERTY_TYPES].sort()
    expect(registryKeys).toEqual(expectedKeys)
  })

  it("has exactly 21 entries", () => {
    expect(Object.keys(propertyBadgeRegistry)).toHaveLength(21)
  })

  it("each entry is a function (React component)", () => {
    for (const component of Object.values(propertyBadgeRegistry)) {
      expect(typeof component).toBe("function")
    }
  })
})
