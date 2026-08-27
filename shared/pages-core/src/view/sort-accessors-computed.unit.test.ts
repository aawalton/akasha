import { describe, expect, test } from "bun:test"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { PropertyDefinition } from "../types"
import { getAccessor, row, selectAlpha, sortBy, type TestRow } from "./_sort-accessors-test-helpers"
import { generateSortAccessors } from "./sort-accessors"

describe("generateSortAccessors — computed property resolution", () => {
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

  test("rollup of number sorts numerically when context supplied", () => {
    const accessors = generateSortAccessors([rollupOfNumberDef], sourceTypeId, numberTypes)
    expect(getAccessor(accessors, "ro")(row("1", { ro: 42 }))).toBe(42)
    expect(getAccessor(accessors, "ro")(row("2", { ro: "17" }))).toBe(17)
    expect(getAccessor(accessors, "ro")(row("3", { ro: null }))).toBeNull()
  })

  test("aggregate sorts numerically", () => {
    const aggDef: PropertyDefinition = {
      id: "agg",
      title: "Total",
      type: "aggregate",
      config: { relationPropertyId: "r", targetPropertyId: "n", function: "sum" },
    }
    const accessors = generateSortAccessors([aggDef], sourceTypeId, new Map())
    expect(getAccessor(accessors, "agg")(row("1", { agg: 99 }))).toBe(99)
  })

  test("formula with returnType number sorts numerically", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: { expression: "1+1", returnType: "number" },
    }
    const accessors = generateSortAccessors([def], sourceTypeId, new Map())
    expect(getAccessor(accessors, "f")(row("1", { f: 7 }))).toBe(7)
  })

  test("backward compat: omitting context keeps rollup on rollupOps.getSortValue", () => {
    const accessors = generateSortAccessors([rollupOfNumberDef])
    expect(getAccessor(accessors, "ro")(row("1", { ro: "17" }))).toBe("17")
  })
})

describe("generateSortAccessors — relation with resolver", () => {
  const relationDef: PropertyDefinition = { id: "parent", title: "Parent", type: "relation" }

  const targets: Record<string, { id: string; title: string; sortOrder?: number }> = {
    faith: { id: "faith", title: "Faith", sortOrder: 1 },
    love: { id: "love", title: "Love", sortOrder: 2 },
    health: { id: "health", title: "Health", sortOrder: 3 },
    fun: { id: "fun", title: "Fun", sortOrder: 5 },
    misc: { id: "misc", title: "Misc" },
  }
  const resolver = { resolve: (id: string) => targets[id] ?? null }

  test("relation accessor returns target sortOrder when present", () => {
    const accessors = generateSortAccessors([relationDef], undefined, undefined, resolver)
    expect(getAccessor(accessors, "parent")(row("1", { parent: "faith" }))).toBe(1)
    expect(getAccessor(accessors, "parent")(row("2", { parent: "fun" }))).toBe(5)
  })

  test("falls back to target title when target has no sortOrder", () => {
    const accessors = generateSortAccessors([relationDef], undefined, undefined, resolver)
    expect(getAccessor(accessors, "parent")(row("1", { parent: "misc" }))).toBe("Misc")
  })

  test("falls back to raw id when resolver misses", () => {
    const accessors = generateSortAccessors([relationDef], undefined, undefined, resolver)
    expect(getAccessor(accessors, "parent")(row("1", { parent: "ghost-id" }))).toBe("ghost-id")
  })

  test("orders rows by target sortOrder, not title alpha", () => {
    const rows: TestRow[] = [
      row("1", { parent: "fun" }),
      row("2", { parent: "faith" }),
      row("3", { parent: "health" }),
      row("4", { parent: "love" }),
    ]
    const accessors = generateSortAccessors([relationDef], undefined, undefined, resolver)
    const sorted = sortBy(rows, getAccessor(accessors, "parent"))
    expect(sorted.map((r) => r._id)).toEqual(["2", "4", "3", "1"])
  })

  test("non-relation properties unchanged when resolver supplied", () => {
    const accessors = generateSortAccessors([selectAlpha], undefined, undefined, resolver)
    expect(getAccessor(accessors, "color")(row("1", { color: "r" }))).toBe("Red")
  })
})
