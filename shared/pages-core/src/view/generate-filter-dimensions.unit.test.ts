import { describe, expect, it } from "bun:test"
import { propertyTypeOpsRegistryKeys } from "../property-types/registry"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { PropertyDefinition, PropertyType } from "../types"
import { generateFilterDimensions } from "./generate-filter-dimensions"

function makeProp(
  overrides: Partial<PropertyDefinition> & { type: PropertyType }
): PropertyDefinition {
  const def: PropertyDefinition = {
    id: overrides.id ?? `prop-${overrides.type}`,
    title: overrides.title ?? overrides.type,
    type: overrides.type,
  }
  return overrides.config !== undefined ? { ...def, config: overrides.config } : def
}

function asPropertyType(type: string): PropertyType {
  return type as PropertyType
}

const ALL_REGISTERED_TYPES: PropertyType[] = [...propertyTypeOpsRegistryKeys]

describe("generateFilterDimensions — all registered property types", () => {
  for (const type of ALL_REGISTERED_TYPES) {
    it(`produces a valid PageFilterDimension for type "${type}"`, () => {
      const prop = makeProp({ type, title: `My ${type}` })
      const [dim] = generateFilterDimensions([prop])

      expect(dim).toBeDefined()
      expect(dim.id).toBe(prop.id)
      expect(dim.label).toBe(`My ${type}`)
      expect(dim.type).toBe(type)
      expect(Array.isArray(dim.operators)).toBe(true)
      expect(dim.operators.length).toBeGreaterThan(0)

      for (const op of dim.operators) {
        expect(typeof op.value).toBe("string")
        expect(typeof op.label).toBe("string")
      }
    })
  }

  it("covers all 21 property types in the registry", () => {
    expect(ALL_REGISTERED_TYPES.length).toBe(21)
  })
})

describe("generateFilterDimensions — relation types", () => {
  it("extracts targetPageTypeId for relation type", () => {
    const prop = makeProp({
      type: "relation",
      title: "Linked Page",
      config: { targetPageTypeId: "page-type-abc" },
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.targetPageTypeId).toBe("page-type-abc")
  })

  it("extracts targetPageTypeId for multi-relation type", () => {
    const prop = makeProp({
      type: "multi-relation",
      title: "Related Pages",
      config: { targetPageTypeId: "page-type-xyz" },
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.targetPageTypeId).toBe("page-type-xyz")
  })

  it("leaves targetPageTypeId undefined when relation config is missing", () => {
    const prop = makeProp({ type: "relation", title: "No Config Relation" })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.targetPageTypeId).toBeUndefined()
  })

  it("leaves targetPageTypeId undefined for non-relation types", () => {
    const prop = makeProp({
      type: "text",
      title: "Plain Text",
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.targetPageTypeId).toBeUndefined()
  })
})

describe("generateFilterDimensions — select options", () => {
  const selectOptions = [
    { id: "opt-1", label: "Alpha" },
    { id: "opt-2", label: "Beta" },
  ]

  it("passes through options for select type", () => {
    const prop = makeProp({
      type: "select",
      title: "Status",
      config: { options: selectOptions },
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.options).toEqual(selectOptions)
  })

  it("passes through options for multi-select type", () => {
    const prop = makeProp({
      type: "multi-select",
      title: "Tags",
      config: { options: selectOptions },
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.options).toEqual(selectOptions)
  })

  it("leaves options undefined when config has no options key", () => {
    const prop = makeProp({
      type: "select",
      title: "No Opts",
      config: { someOtherKey: "val" },
    })
    const [dim] = generateFilterDimensions([prop])

    expect(dim.options).toBeUndefined()
  })
})

describe("generateFilterDimensions — no config", () => {
  it("handles property with undefined config without crashing", () => {
    const prop = makeProp({ type: "text", title: "Bare Prop" })
    const [dim] = generateFilterDimensions([prop])

    expect(dim).toBeDefined()
    expect(dim.options).toBeUndefined()
    expect(dim.targetPageTypeId).toBeUndefined()
  })
})

describe("generateFilterDimensions — empty input", () => {
  it("returns empty array for empty properties", () => {
    expect(generateFilterDimensions([])).toEqual([])
  })
})

describe("generateFilterDimensions — sorting", () => {
  it("sorts dimensions alphabetically by label", () => {
    const props = [
      makeProp({ id: "p-z", type: "text", title: "Zebra" }),
      makeProp({ id: "p-a", type: "number", title: "Alpha" }),
      makeProp({ id: "p-m", type: "boolean", title: "Middle" }),
    ]
    const dims = generateFilterDimensions(props)

    expect(dims.map((d) => d.label)).toEqual(["Alpha", "Middle", "Zebra"])
  })
})

describe("generateFilterDimensions — unknown type", () => {
  it("silently skips properties with unregistered types", () => {
    const props = [
      makeProp({ id: "p-good", type: "text", title: "Good" }),
      makeProp({ id: "p-bad", type: asPropertyType("not-a-real-type"), title: "Bad" }),
    ]
    const dims = generateFilterDimensions(props)

    expect(dims).toHaveLength(1)
    expect(dims[0].id).toBe("p-good")
  })

  it("returns empty when all types are unknown", () => {
    const props = [
      makeProp({ id: "p1", type: asPropertyType("fake1"), title: "A" }),
      makeProp({ id: "p2", type: asPropertyType("fake2"), title: "B" }),
    ]
    expect(generateFilterDimensions(props)).toEqual([])
  })
})

describe("generateFilterDimensions — computed property resolution", () => {
  const sourceTypeId = "t_source"
  const targetTypeId = "t_target"

  const makeRollupContext = (
    targetProp: PropertyDefinition
  ): { rollupDef: PropertyDefinition; types: PageTypePropertiesMap } => {
    const rollupDef: PropertyDefinition = {
      id: "ro",
      title: "Rollup Column",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: targetProp.id },
    }
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
          rollupDef,
        ],
      ],
      [targetTypeId, [targetProp]],
    ])
    return { rollupDef, types }
  }

  it("rollup of number exposes number operators and preserves source id/label", () => {
    const { rollupDef, types } = makeRollupContext({
      id: "num",
      title: "Num",
      type: "number",
    })
    const [dim] = generateFilterDimensions([rollupDef], sourceTypeId, types)
    expect(dim.id).toBe("ro")
    expect(dim.label).toBe("Rollup Column")
    expect(dim.type).toBe("number")
    const opValues = dim.operators.map((o) => o.value)
    expect(opValues).toContain("gt")
    expect(opValues).toContain("lt")
    expect(opValues).toContain("equals")
  })

  it("rollup of select exposes select operators AND underlying options", () => {
    const options = [
      { id: "o1", label: "One" },
      { id: "o2", label: "Two" },
    ]
    const { rollupDef, types } = makeRollupContext({
      id: "status",
      title: "Status",
      type: "select",
      config: { options },
    })
    const [dim] = generateFilterDimensions([rollupDef], sourceTypeId, types)
    expect(dim.type).toBe("select")
    expect(dim.options).toEqual(options)
  })

  it("rollup of relation exposes relation operators AND targetPageTypeId", () => {
    const finalTypeId = "t_final"
    const { rollupDef, types } = makeRollupContext({
      id: "downstream",
      title: "Downstream",
      type: "relation",
      config: { targetPageTypeId: finalTypeId },
    })
    const [dim] = generateFilterDimensions([rollupDef], sourceTypeId, types)
    expect(dim.type).toBe("relation")
    expect(dim.targetPageTypeId).toBe(finalTypeId)
  })

  it("aggregate column resolves to number operators", () => {
    const def: PropertyDefinition = {
      id: "agg",
      title: "Total",
      type: "aggregate",
      config: { relationPropertyId: "r", targetPropertyId: "n", function: "sum" },
    }
    const [dim] = generateFilterDimensions([def], sourceTypeId, new Map())
    expect(dim.type).toBe("number")
    const opValues = dim.operators.map((o) => o.value)
    expect(opValues).toContain("gt")
  })

  it("formula column uses operators for the declared returnType (boolean)", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "IsDone",
      type: "formula",
      config: { expression: "true", returnType: "boolean" },
    }
    const [dim] = generateFilterDimensions([def], sourceTypeId, new Map())
    expect(dim.type).toBe("boolean")
  })

  it("backward compat: omitting context leaves rollup with is_empty / is_not_empty only", () => {
    const rollupDef: PropertyDefinition = {
      id: "ro",
      title: "Rollup Column",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "num" },
    }
    const [dim] = generateFilterDimensions([rollupDef])
    expect(dim.type).toBe("rollup")
    expect(dim.operators.map((o) => o.value).sort()).toEqual(["is_empty", "is_not_empty"])
  })
})

describe("generateFilterDimensions — multiple properties", () => {
  it("returns correct count and preserves sorted order", () => {
    const props = [
      makeProp({ id: "p1", type: "text", title: "Delta" }),
      makeProp({ id: "p2", type: "number", title: "Bravo" }),
      makeProp({ id: "p3", type: "boolean", title: "Charlie" }),
      makeProp({ id: "p4", type: "url", title: "Alpha" }),
      makeProp({
        id: "p5",
        type: "select",
        title: "Echo",
        config: { options: [{ id: "a", label: "A" }] },
      }),
    ]
    const dims = generateFilterDimensions(props)

    expect(dims).toHaveLength(5)
    expect(dims.map((d) => d.label)).toEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"])

    expect(dims.find((d) => d.label === "Alpha")?.type).toBe("url")
    expect(dims.find((d) => d.label === "Echo")?.options).toEqual([{ id: "a", label: "A" }])
  })
})
