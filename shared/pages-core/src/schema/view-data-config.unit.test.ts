import { describe, expect, test } from "bun:test"
import {
  parseViewDataJSON,
  type ViewConfig,
  type ViewDataJSON,
  viewConfigToData,
  viewDataToConfig,
} from "./view-data"

describe("viewDataToConfig", () => {
  test("extracts typed ViewConfig from ViewDataJSON", () => {
    const data: ViewDataJSON = {
      version: 1,
      layout: "table",
      sorts: [{ field: "name", direction: "asc" }],
      filters: [{ propertyId: "status", operator: "equals", value: "active" }],
      group_by: "status",
    }
    const config = viewDataToConfig(data)
    expect(config.sorts).toEqual([{ field: "name", direction: "asc" }])
    expect(config.filters).toEqual([{ propertyId: "status", operator: "equals", value: "active" }])
    expect(config.groupBy).toBe("status")
    expect(config.groupSorts).toBeUndefined()
  })

  test("handles empty ViewDataJSON", () => {
    const config = viewDataToConfig({ version: 1 })
    expect(config.sorts).toBeUndefined()
    expect(config.filters).toBeUndefined()
    expect(config.groupBy).toBeUndefined()
  })
})

describe("viewDataToConfig correctness", () => {
  test("sorts-only: filters and groupBy undefined", () => {
    const config = viewDataToConfig({
      version: 1,
      sorts: [{ field: "x", direction: "asc" }],
    })
    expect(config.sorts).toEqual([{ field: "x", direction: "asc" }])
    expect(config.filters).toBeUndefined()
    expect(config.groupBy).toBeUndefined()
  })

  test("filters-only: sorts and groupBy undefined", () => {
    const config = viewDataToConfig({
      version: 1,
      filters: [{ propertyId: "p", operator: "equals", value: 1 }],
    })
    expect(config.filters).toEqual([{ propertyId: "p", operator: "equals", value: 1 }])
    expect(config.sorts).toBeUndefined()
    expect(config.groupBy).toBeUndefined()
  })

  test("group_by-only: groupBy set, sorts and filters undefined", () => {
    const config = viewDataToConfig({ version: 1, group_by: "cat" })
    expect(config.groupBy).toBe("cat")
    expect(config.sorts).toBeUndefined()
    expect(config.filters).toBeUndefined()
  })

  test("all fields together", () => {
    const config = viewDataToConfig({
      version: 1,
      sorts: [{ field: "name", direction: "desc" }],
      filters: [{ propertyId: "status", operator: "equals", value: "open" }],
      group_by: "type",
    })
    expect(config.sorts).toHaveLength(1)
    expect(config.filters).toHaveLength(1)
    expect(config.groupBy).toBe("type")
  })

  test("no fields: everything undefined", () => {
    const config = viewDataToConfig({ version: 1 })
    expect(config.sorts).toBeUndefined()
    expect(config.filters).toBeUndefined()
    expect(config.groupBy).toBeUndefined()
    expect(config.groupSorts).toBeUndefined()
  })

  test("order of sorts preserved", () => {
    const sorts = [
      { field: "a", direction: "asc" as const },
      { field: "b", direction: "desc" as const },
      { field: "c", direction: "asc" as const },
      { field: "d", direction: "desc" as const },
    ]
    const config = viewDataToConfig({ version: 1, sorts })
    expect(config.sorts?.map((s) => s.field)).toEqual(["a", "b", "c", "d"])
  })

  test("order of filters preserved", () => {
    const filters = [
      { propertyId: "f1", operator: "equals", value: 1 },
      { propertyId: "f2", operator: "gt", value: 2 },
      { propertyId: "f3", operator: "contains", value: "x" },
    ]
    const config = viewDataToConfig({ version: 1, filters })
    expect(config.filters?.map((f) => f.propertyId)).toEqual(["f1", "f2", "f3"])
  })
})

describe("viewConfigToData", () => {
  test("produces Partial<ViewDataJSON> from ViewConfig", () => {
    const config: ViewConfig = {
      sorts: [{ field: "name", direction: "asc" }],
      filters: [{ propertyId: "status", operator: "equals" }],
      groupBy: "status",
    }
    const data = viewConfigToData(config)
    expect(data.sorts).toEqual([{ field: "name", direction: "asc" }])
    expect(data.filters).toEqual([{ propertyId: "status", operator: "equals" }])
    expect(data.group_by).toBe("status")
  })

  test("omits group_by when groupBy is undefined", () => {
    const data = viewConfigToData({})
    expect(data.group_by).toBeUndefined()
  })

  test("serializes groupSorts to group_sorts", () => {
    const config: ViewConfig = {
      groupBy: "status",
      groupSorts: [
        { field: "priority", direction: "desc" },
        { field: "name", direction: "asc" },
      ],
    }
    const data = viewConfigToData(config)
    expect(data.group_sorts).toEqual([
      { field: "priority", direction: "desc" },
      { field: "name", direction: "asc" },
    ])
  })

  test("omits group_sorts when groupSorts is undefined", () => {
    const data = viewConfigToData({})
    expect(data.group_sorts).toBeUndefined()
  })
})

describe("viewDataToConfig group_sorts", () => {
  test("reads group_sorts into config.groupSorts", () => {
    const config = viewDataToConfig({
      version: 1,
      group_by: "status",
      group_sorts: [{ field: "priority", direction: "desc" }],
    })
    expect(config.groupSorts).toEqual([{ field: "priority", direction: "desc" }])
  })

  test("missing group_sorts yields undefined", () => {
    const config = viewDataToConfig({ version: 1, group_by: "status" })
    expect(config.groupSorts).toBeUndefined()
  })
})

describe("group_granularity ↔ groupGranularity", () => {
  test("serializes groupGranularity to group_granularity", () => {
    const data = viewConfigToData({ groupBy: "due", groupGranularity: "week" })
    expect(data.group_granularity).toBe("week")
  })

  test("omits group_granularity when groupGranularity is undefined", () => {
    const data = viewConfigToData({})
    expect(data.group_granularity).toBeUndefined()
  })

  test("reads group_granularity into config.groupGranularity", () => {
    const config = viewDataToConfig({
      version: 1,
      group_by: "due",
      group_granularity: "month",
    })
    expect(config.groupGranularity).toBe("month")
  })

  test("missing group_granularity yields undefined", () => {
    const config = viewDataToConfig({ version: 1, group_by: "due" })
    expect(config.groupGranularity).toBeUndefined()
  })

  test("each granularity round-trips", () => {
    for (const g of ["none", "week", "month", "year"] as const) {
      const data = viewConfigToData({ groupBy: "due", groupGranularity: g })
      const back = viewDataToConfig({ version: 1, ...data })
      expect(back.groupGranularity).toBe(g)
    }
  })

  test("groupGranularity survives parseViewDataJSON → viewDataToConfig", () => {
    const data = viewConfigToData({ groupBy: "due", groupGranularity: "year" })
    const parsed = parseViewDataJSON({ version: 1, ...data })
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      const back = viewDataToConfig(parsed.data)
      expect(back.groupGranularity).toBe("year")
    }
  })
})
