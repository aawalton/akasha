import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { resolveComputedProperty } from "./resolve-computed-type"
import type { PageTypePropertiesMap } from "./rollup"

const emptyTypes: PageTypePropertiesMap = new Map()

describe("resolveComputedProperty — rollup fallbacks", () => {
  const def: PropertyDefinition = {
    id: "ro",
    title: "Rollup",
    type: "rollup",
    config: { relationPropertyId: "rel", targetPropertyId: "tgt" },
  }

  test("missing source page type returns original unchanged", () => {
    expect(resolveComputedProperty(def, "t_missing", emptyTypes)).toBe(def)
  })

  test("missing relation property on current page type returns original unchanged", () => {
    const types: PageTypePropertiesMap = new Map([
      ["t_source", [{ id: "different", title: "D", type: "relation" }]],
    ])
    expect(resolveComputedProperty(def, "t_source", types)).toBe(def)
  })

  test("relation property missing targetPageTypeId returns original unchanged", () => {
    const types: PageTypePropertiesMap = new Map([
      ["t_source", [{ id: "rel", title: "Rel", type: "relation" }]],
    ])
    expect(resolveComputedProperty(def, "t_source", types)).toBe(def)
  })

  test("missing target page type in map returns original unchanged", () => {
    const types: PageTypePropertiesMap = new Map([
      [
        "t_source",
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: "t_ghost" },
          },
        ],
      ],
    ])
    expect(resolveComputedProperty(def, "t_source", types)).toBe(def)
  })

  test("missing target property on target page type returns original unchanged", () => {
    const types: PageTypePropertiesMap = new Map([
      [
        "t_source",
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: "t_target" },
          },
        ],
      ],
      ["t_target", [{ id: "other", title: "Other", type: "number" }]],
    ])
    expect(resolveComputedProperty(def, "t_source", types)).toBe(def)
  })
})

describe("resolveComputedProperty — termination guards", () => {
  test("cyclic rollup chain terminates and returns original", () => {
    const typeA = "t_a"
    const typeB = "t_b"
    const types: PageTypePropertiesMap = new Map([
      [
        typeA,
        [
          { id: "b", title: "B", type: "relation", config: { targetPageTypeId: typeB } },
          {
            id: "x",
            title: "X",
            type: "rollup",
            config: { relationPropertyId: "b", targetPropertyId: "y" },
          },
        ],
      ],
      [
        typeB,
        [
          { id: "a", title: "A", type: "relation", config: { targetPageTypeId: typeA } },
          {
            id: "y",
            title: "Y",
            type: "rollup",
            config: { relationPropertyId: "a", targetPropertyId: "x" },
          },
        ],
      ],
    ])
    const def: PropertyDefinition = {
      id: "x",
      title: "X",
      type: "rollup",
      config: { relationPropertyId: "b", targetPropertyId: "y" },
    }
    let resolved: PropertyDefinition | null = null
    expect(() => {
      resolved = resolveComputedProperty(def, typeA, types)
    }).not.toThrow()
    expect(resolved).toBe(def)
  })

  test("chain of 11 rollups terminates without exceeding depth", () => {
    const types: PageTypePropertiesMap = new Map()
    const chainLength = 11
    for (let i = 0; i < chainLength; i++) {
      const next = `t_${i + 1}`
      types.set(`t_${i}`, [
        {
          id: "rel",
          title: "Rel",
          type: "relation",
          config: { targetPageTypeId: next },
        },
        {
          id: "r",
          title: "R",
          type: "rollup",
          config: { relationPropertyId: "rel", targetPropertyId: "r" },
        },
      ])
    }
    types.set(`t_${chainLength}`, [{ id: "r", title: "R", type: "number" }])

    const def: PropertyDefinition = {
      id: "r",
      title: "R",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "r" },
    }
    let resolved: PropertyDefinition | null = null
    expect(() => {
      resolved = resolveComputedProperty(def, "t_0", types)
    }).not.toThrow()
    expect(resolved).toBe(def)
  })
})
