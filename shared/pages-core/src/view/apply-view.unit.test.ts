import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first.ts"
import type { ViewConfig } from "../schema/view-data.ts"
import type { PropertyDefinition } from "../types.ts"
import type { ReadonlyJSONValue } from "../schema/pages.ts"
import type { FilterableRow } from "./apply-filters.ts"
import { applyView } from "./apply-view.ts"

function at<T>(array: readonly T[], index: number): T {
  const value = array[index]
  if (value === undefined) throw new Error(`expected element at index ${index}`)
  return value
}

type TestRow = FilterableRow & {
  readonly _id: string
}

function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

const textDef: PropertyDefinition = { id: "t", title: "Text", type: "text" }
const numberDef: PropertyDefinition = { id: "n", title: "Num", type: "number" }

describe("applyView — composition order", () => {
  test("filter runs before sort (sort operates on filtered set)", () => {
    const items = [row("1", { n: 5 }), row("2", { n: 1 }), row("3", { n: 10 })]
    const config: ViewConfig = {
      filters: [{ propertyId: "n", operator: "gt", value: 3 }],
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView(items, [numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["1", "3"])
  })
})

describe("applyView — filter-only config", () => {
  test("sorts undefined", () => {
    const items = [row("1", { t: "foo" }), row("2", { t: "bar" })]
    const config: ViewConfig = {
      filters: [{ propertyId: "t", operator: "equals", value: "foo" }],
    }
    const result = applyView(items, [textDef], config)
    expect(result.length).toBe(1)
    expect(requireFirst(result)._id).toBe("1")
  })

  test("sorts empty array", () => {
    const items = [row("1", { t: "foo" }), row("2", { t: "bar" })]
    const config: ViewConfig = {
      filters: [{ propertyId: "t", operator: "equals", value: "foo" }],
      sorts: [],
    }
    const result = applyView(items, [textDef], config)
    expect(result.length).toBe(1)
    expect(requireFirst(result)._id).toBe("1")
  })
})

describe("applyView — sort-only config", () => {
  test("filters undefined", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 }), row("3", { n: 2 })]
    const config: ViewConfig = {
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView(items, [numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("filters empty array", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 }), row("3", { n: 2 })]
    const config: ViewConfig = {
      filters: [],
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView(items, [numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })
})

describe("applyView — filters + sorts combined", () => {
  test("filters then sorts", () => {
    const items = [
      row("1", { t: "keep", n: 30 }),
      row("2", { t: "drop", n: 10 }),
      row("3", { t: "keep", n: 20 }),
      row("4", { t: "keep", n: 10 }),
    ]
    const config: ViewConfig = {
      filters: [{ propertyId: "t", operator: "equals", value: "keep" }],
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView(items, [textDef, numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["4", "3", "1"])
  })
})

describe("applyView — empty items", () => {
  test("returns empty array", () => {
    const config: ViewConfig = {
      filters: [{ propertyId: "t", operator: "equals", value: "foo" }],
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView([], [textDef, numberDef], config)
    expect(result).toEqual([])
  })
})

const TITLE_UNIVERSAL: PropertyDefinition = {
  id: "title",
  title: "Title",
  type: "text",
  config: {},
}
const COMPLETED_AT_UNIVERSAL: PropertyDefinition = {
  id: "completedAt",
  title: "Completed At",
  type: "number",
  config: {},
}

describe("applyView — universal columns sortable when supplied in properties", () => {
  test("sorts on title (text universal) when title is in properties", () => {
    const items = [
      row("1", { title: "Charlie" }),
      row("2", { title: "Alpha" }),
      row("3", { title: "Bravo" }),
    ]
    const config: ViewConfig = {
      sorts: [{ field: "title", direction: "asc" }],
    }
    const result = applyView(items, [TITLE_UNIVERSAL], config)
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("sorts on completedAt (number universal) when completedAt is in properties", () => {
    const items = [
      row("1", { completedAt: 1_700_000_000_000 }),
      row("2", { completedAt: 1_800_000_000_000 }),
      row("3", { completedAt: 1_600_000_000_000 }),
    ]
    const config: ViewConfig = {
      sorts: [{ field: "completedAt", direction: "desc" }],
    }
    const result = applyView(items, [COMPLETED_AT_UNIVERSAL], config)
    expect(result.map((r) => r._id)).toEqual(["2", "1", "3"])
  })
})

describe("applyView — no-op passthrough", () => {
  test("config with empty arrays returns resolved items unchanged", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 })]
    const config: ViewConfig = { filters: [], sorts: [] }
    const result = applyView(items, [numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
    expect(requireFirst(result).n).toBe(3)
    expect(at(result, 1).n).toBe(1)
  })
})

const SEQ_DEF: PropertyDefinition = { id: "seq", title: "Sequence", type: "number", config: {} }
const COMPLETED_AT_DEF: PropertyDefinition = {
  id: "completedAt",
  title: "Completed At",
  type: "number",
  config: {},
}

describe("applyView — universal column filtering via inherited properties", () => {
  test("filters on seq (number universal) when seq is supplied in properties", () => {
    const items = [row("1", { seq: 1 }), row("2", { seq: 5 }), row("3", { seq: 10 })]
    const config: ViewConfig = {
      filters: [{ propertyId: "seq", operator: "lte", value: 5 }],
    }
    const result = applyView(items, [SEQ_DEF], config)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })

  test("filters on completedAt (number universal) when completedAt is supplied in properties", () => {
    const items = [
      row("1", { completedAt: 1_700_000_000_000 }),
      row("2", { completedAt: 1_800_000_000_000 }),
    ]
    const config: ViewConfig = {
      filters: [{ propertyId: "completedAt", operator: "gte", value: 1_750_000_000_000 }],
    }
    const result = applyView(items, [COMPLETED_AT_DEF], config)
    expect(result.map((r) => r._id)).toEqual(["2"])
  })
})

describe("applyView — rollup-of-universal-column filtering", () => {
  test("rollup targeting universal seq dispatches through number operators", () => {
    const sourceTypeId = "t_workflow"
    const targetTypeId = "t_pipeline"
    const rollupDef: PropertyDefinition = {
      id: "pipelineNumber",
      title: "Pipeline Number",
      type: "rollup",
      config: { relationPropertyId: "pipeline", targetPropertyId: "seq" },
    }
    const types = new Map<string, readonly PropertyDefinition[]>([
      [
        sourceTypeId,
        [
          {
            id: "pipeline",
            title: "Pipeline",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          } satisfies PropertyDefinition,
          rollupDef,
        ],
      ],
      [targetTypeId, [SEQ_DEF]],
    ])
    const items = [
      row("1", { pipelineNumber: 1 }),
      row("2", { pipelineNumber: 5 }),
      row("3", { pipelineNumber: 10 }),
    ]
    const config: ViewConfig = {
      filters: [{ propertyId: "pipelineNumber", operator: "lte", value: 5 }],
    }
    const result = applyView(items, [rollupDef], config, sourceTypeId, types)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })
})

describe("applyView — computed property resolution", () => {
  const sourceTypeId = "t_source"
  const targetTypeId = "t_target"

  const rollupOfNumberDef: PropertyDefinition = {
    id: "ro",
    title: "RollupNum",
    type: "rollup",
    config: { relationPropertyId: "rel", targetPropertyId: "num" },
  }
  const numberTypes = new Map([
    [
      sourceTypeId,
      [
        {
          id: "rel",
          title: "Rel",
          type: "relation",
          config: { targetPageTypeId: targetTypeId },
        } satisfies PropertyDefinition,
        rollupOfNumberDef,
      ],
    ],
    [targetTypeId, [{ id: "num", title: "Num", type: "number" } satisfies PropertyDefinition]],
  ])

  test("rollup filter + sort dispatch through effective number type", () => {
    const items = [row("1", { ro: 10 }), row("2", { ro: 3 }), row("3", { ro: 25 })]
    const config: ViewConfig = {
      filters: [{ propertyId: "ro", operator: "gt", value: 5 }],
      sorts: [{ field: "ro", direction: "asc" }],
    }
    const result = applyView(items, [rollupOfNumberDef], config, sourceTypeId, numberTypes)
    expect(result.map((r) => r._id)).toEqual(["1", "3"])
  })
})

describe("applyView — preserves row identity", () => {
  test("extra properties on rows (like _id) are maintained through the pipeline", () => {
    type ExtendedRow = TestRow & {
      readonly customField: string
    }
    const items: ExtendedRow[] = [
      { _id: "abc", n: 2, customField: "hello" },
      { _id: "def", n: 1, customField: "world" },
    ]
    const config: ViewConfig = {
      sorts: [{ field: "n", direction: "asc" }],
    }
    const result = applyView(items, [numberDef], config)
    expect(result.map((r) => r._id)).toEqual(["def", "abc"])
    expect(result[0]?.customField).toBe("world")
    expect(result[1]?.customField).toBe("hello")
  })
})
