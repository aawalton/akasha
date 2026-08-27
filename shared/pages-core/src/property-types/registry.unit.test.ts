import { describe, expect, test } from "bun:test"
import { propertyTypeOpsRegistry, propertyTypeOpsRegistryKeys } from "./registry"

describe("propertyTypeOpsRegistry", () => {
  test("contains the 21 extracted keys (18 baseline + progress from #9224, boolean from #12000, rich-document from #12823, action-button from #14213)", () => {
    expect(Object.keys(propertyTypeOpsRegistry).sort()).toEqual([
      "action-button",
      "aggregate",
      "boolean",
      "calendar-date",
      "calendar-time",
      "formula",
      "instant",
      "json",
      "markdown",
      "multi-relation",
      "multi-select",
      "number",
      "path-select",
      "progress",
      "relation",
      "rich-document",
      "rollup",
      "rrule",
      "select",
      "text",
      "url",
    ])
  })

  test("propertyTypeOpsRegistryKeys length is 21", () => {
    expect(propertyTypeOpsRegistryKeys.length).toBe(21)
  })
})
