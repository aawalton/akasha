import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types.ts"
import { resolveComputedProperty } from "./resolve-computed-type.ts"
import type { PageTypePropertiesMap } from "./rollup.ts"

const emptyTypes: PageTypePropertiesMap = new Map()

describe("resolveComputedProperty — non-computed types", () => {
  test("text is returned unchanged", () => {
    const def: PropertyDefinition = { id: "t", title: "Title", type: "text" }
    expect(resolveComputedProperty(def, "pt", emptyTypes)).toBe(def)
  })

  test("number is returned unchanged", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "Count",
      type: "number",
      config: { min: 0 },
    }
    expect(resolveComputedProperty(def, "pt", emptyTypes)).toBe(def)
  })

  test("select is returned unchanged", () => {
    const def: PropertyDefinition = {
      id: "s",
      title: "Status",
      type: "select",
      config: { options: [{ id: "a", label: "A" }] },
    }
    expect(resolveComputedProperty(def, "pt", emptyTypes)).toBe(def)
  })
})

describe("resolveComputedProperty — preserves id and name", () => {
  test("aggregate preserves id and name", () => {
    const def: PropertyDefinition = {
      id: "my-agg",
      title: "My Aggregate",
      type: "aggregate",
      config: { relationPropertyId: "r", targetPropertyId: "t", function: "sum" },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.id).toBe("my-agg")
    expect(resolved.title).toBe("My Aggregate")
  })

  test("formula preserves id and name", () => {
    const def: PropertyDefinition = {
      id: "my-formula",
      title: "My Formula",
      type: "formula",
      config: { expression: "1", returnType: "number" },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.id).toBe("my-formula")
    expect(resolved.title).toBe("My Formula")
  })

  test("resolved rollup preserves id and name from the rollup definition", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
        ],
      ],
      [targetTypeId, [{ id: "num", title: "Target Number", type: "number" }]],
    ])
    const def: PropertyDefinition = {
      id: "my-rollup",
      title: "My Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "num" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.id).toBe("my-rollup")
    expect(resolved.title).toBe("My Rollup")
    expect(resolved.type).toBe("number")
  })

  test("non-computed types preserve all fields (identity)", () => {
    const def: PropertyDefinition = {
      id: "t",
      title: "Title",
      type: "text",
      accent: true,
      sort: "alpha",
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved).toBe(def)
    expect(resolved.id).toBe("t")
    expect(resolved.title).toBe("Title")
  })
})

describe("resolveComputedProperty — preserves colorRules onto the resolved type", () => {
  const colorRules = [
    { when: "{value} == 3", variant: "green" },
    { when: "{value} == 1", variant: "red" },
  ] as const

  test("formula resolved to number carries colorRules through", () => {
    const def: PropertyDefinition = {
      id: "faithLevel",
      title: "Faith Level",
      type: "formula",
      config: { expression: "x", returnType: "number" },
      colorRules,
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.colorRules).toEqual(colorRules)
  })

  test("aggregate resolved to number carries colorRules through", () => {
    const def: PropertyDefinition = {
      id: "total",
      title: "Total",
      type: "aggregate",
      config: { relationPropertyId: "r", targetPropertyId: "t", function: "sum" },
      colorRules,
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.colorRules).toEqual(colorRules)
  })

  test("resolved rollup carries the rollup's colorRules", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [{ id: "rel", title: "Rel", type: "relation", config: { targetPageTypeId: targetTypeId } }],
      ],
      [targetTypeId, [{ id: "num", title: "Target Number", type: "number" }]],
    ])
    const def: PropertyDefinition = {
      id: "my-rollup",
      title: "My Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "num" },
      colorRules,
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("number")
    expect(resolved.colorRules).toEqual(colorRules)
  })
})
