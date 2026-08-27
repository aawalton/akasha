import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { applyFilters, type FilterableRow, testFilter } from "./apply-filters"

function row(data: Record<string, ReadonlyJSONValue>): FilterableRow {
  return data
}

describe("applyFilters — computed property resolution", () => {
  const sourceTypeId = "t_source"
  const targetTypeId = "t_target"

  const rollupOfNumberDef: PropertyDefinition = {
    id: "ro",
    title: "RollupNum",
    type: "rollup",
    config: { relationPropertyId: "rel", targetPropertyId: "num" },
  }

  const numberTypes: PageTypePropertiesMap = new Map([
    [
      sourceTypeId,
      [
        {
          id: "rel",
          title: "Rel",
          type: "relation",
          config: { targetPageTypeId: targetTypeId },
        },
        rollupOfNumberDef,
      ],
    ],
    [targetTypeId, [{ id: "num", title: "Num", type: "number" }]],
  ])

  test("rollup of number dispatches number predicate (gt) when context supplied", () => {
    const items = [row({ ro: 10 }), row({ ro: 3 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "ro", operator: "gt", value: 5 }],
      [rollupOfNumberDef],
      sourceTypeId,
      numberTypes
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).ro).toBe(10)
  })

  test("aggregate dispatches number predicate (gte)", () => {
    const aggDef: PropertyDefinition = {
      id: "agg",
      title: "Total",
      type: "aggregate",
      config: { relationPropertyId: "r", targetPropertyId: "n", function: "sum" },
    }
    const items = [row({ agg: 100 }), row({ agg: 5 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "agg", operator: "gte", value: 50 }],
      [aggDef],
      sourceTypeId,
      new Map()
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).agg).toBe(100)
  })

  test("backward compat: omitting context keeps rollup on is_empty/is_not_empty only", () => {
    const items = [row({ ro: 10 }), row({ ro: 3 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "ro", operator: "gt", value: 5 }],
      [rollupOfNumberDef]
    )
    expect(filtered.length).toBe(2)
  })

  test("testFilter dispatches through effective type when context supplied", () => {
    expect(
      testFilter(
        10,
        { propertyId: "ro", operator: "gt", value: 5 },
        [rollupOfNumberDef],
        sourceTypeId,
        numberTypes
      )
    ).toBe(true)
    expect(
      testFilter(
        3,
        { propertyId: "ro", operator: "gt", value: 5 },
        [rollupOfNumberDef],
        sourceTypeId,
        numberTypes
      )
    ).toBe(false)
  })

  test("testFilter backward compat: omitting context falls back to rollup predicate", () => {
    expect(testFilter(3, { propertyId: "ro", operator: "gt", value: 5 }, [rollupOfNumberDef])).toBe(
      true
    )
    expect(testFilter(null, { propertyId: "ro", operator: "is_empty" }, [rollupOfNumberDef])).toBe(
      true
    )
  })
})
