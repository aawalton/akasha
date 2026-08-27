import { describe, expect, test } from "bun:test"
import type { PropertyDefinition, PropertyType } from "../types"
import { propertyTypeOpsRegistry, propertyTypeOpsRegistryKeys } from "./registry"

const minimalDefinitions: Record<string, PropertyDefinition> = {
  text: { id: "p", title: "P", type: "text" },
  markdown: { id: "p", title: "P", type: "markdown" },
  number: { id: "p", title: "P", type: "number" },
  boolean: { id: "p", title: "P", type: "boolean" },
  url: { id: "p", title: "P", type: "url" },
  json: { id: "p", title: "P", type: "json" },
  "calendar-date": { id: "p", title: "P", type: "calendar-date" },
  "calendar-time": { id: "p", title: "P", type: "calendar-time" },
  instant: { id: "p", title: "P", type: "instant" },
  select: {
    id: "p",
    title: "P",
    type: "select",
    config: { options: [{ id: "x", label: "X" }] },
  },
  "multi-select": {
    id: "p",
    title: "P",
    type: "multi-select",
    config: { options: [{ id: "x", label: "X" }] },
  },
  "path-select": {
    id: "p",
    title: "P",
    type: "path-select",
    config: { providerId: "test-provider" },
  },
  relation: { id: "p", title: "P", type: "relation" },
  "multi-relation": { id: "p", title: "P", type: "multi-relation" },
  rollup: { id: "p", title: "P", type: "rollup" },
  aggregate: { id: "p", title: "P", type: "aggregate" },
  formula: {
    id: "p",
    title: "P",
    type: "formula",
    config: { expression: "1+1", returnType: "text" },
  },
  rrule: { id: "p", title: "P", type: "rrule" },
  progress: { id: "p", title: "P", type: "progress" },
  "rich-document": { id: "p", title: "P", type: "rich-document" },
  "action-button": { id: "p", title: "P", type: "action-button", config: { verbId: "test-verb" } },
}

const handlerKeys: PropertyType[] = [...propertyTypeOpsRegistryKeys]

describe("propertyTypeOpsRegistry — registered keys", () => {
  test("contains the 21 extracted handlers", () => {
    expect(handlerKeys.sort()).toEqual([
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

  test("every registered key has a definition fixture", () => {
    for (const key of handlerKeys) {
      expect(minimalDefinitions[key]).toBeDefined()
    }
  })
})

describe("propertyTypeOpsRegistry — universal invariants", () => {
  for (const key of handlerKeys) {
    describe(`${key}`, () => {
      const ops = propertyTypeOpsRegistry[key]
      const def = minimalDefinitions[key]
      if (ops === undefined) throw new Error(`expected ops for ${key}`)
      if (def === undefined) throw new Error(`expected definition for ${key}`)

      test("validate(null) returns null (no error for absent value)", () => {
        expect(ops.validate(null, def)).toBeNull()
      })

      test("validate(undefined) returns null (no error for absent value)", () => {
        expect(ops.validate(undefined, def)).toBeNull()
      })

      test("getSortValue(null) does not throw and returns sortable", () => {
        let result: unknown
        expect(() => {
          result = ops.getSortValue(null, def)
        }).not.toThrow()
        expect(result === null || typeof result === "string" || typeof result === "number").toBe(
          true
        )
      })

      test("getSortValue(undefined) does not throw and returns sortable", () => {
        let result: unknown
        expect(() => {
          result = ops.getSortValue(undefined, def)
        }).not.toThrow()
        expect(result === null || typeof result === "string" || typeof result === "number").toBe(
          true
        )
      })

      test("getFilterOperators returns at least one operator", () => {
        const ops2 = ops.getFilterOperators(def)
        expect(Array.isArray(ops2)).toBe(true)
        expect(ops2.length).toBeGreaterThan(0)
      })

      test("every filter operator has a non-empty label", () => {
        for (const op of ops.getFilterOperators(def)) {
          expect(typeof op.value).toBe("string")
          expect(typeof op.label).toBe("string")
          expect(op.label.length).toBeGreaterThan(0)
        }
      })

      test("every filter operator yields a callable predicate", () => {
        for (const op of ops.getFilterOperators(def)) {
          const pred = ops.getFilterPredicate({ operator: op.value, value: null }, def)
          expect(typeof pred).toBe("function")
          expect(() => pred(null)).not.toThrow()
        }
      })

      test("is_empty (when supported) accepts null and returns true", () => {
        const supportsEmpty = ops.getFilterOperators(def).some((o) => o.value === "is_empty")
        if (!supportsEmpty) return
        const pred = ops.getFilterPredicate({ operator: "is_empty", value: null }, def)
        expect(pred(null)).toBe(true)
      })

      test("is_empty and is_not_empty (when both supported) are complements on null", () => {
        const opsList = ops.getFilterOperators(def).map((o) => o.value)
        if (!opsList.includes("is_empty") || !opsList.includes("is_not_empty")) return
        const empty = ops.getFilterPredicate({ operator: "is_empty", value: null }, def)
        const notEmpty = ops.getFilterPredicate({ operator: "is_not_empty", value: null }, def)
        expect(empty(null)).toBe(!notEmpty(null))
      })
    })
  }
})
