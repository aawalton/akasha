import { describe, expect, test } from "bun:test"
import {
  parseViewDataJSON,
  type ViewConfig,
  type ViewDataJSON,
  viewConfigToData,
  viewDataToConfig,
} from "./view-data"

describe("viewConfigToData round-trip", () => {
  test("sorts-only round-trips", () => {
    const config: ViewConfig = { sorts: [{ field: "a", direction: "desc" }] }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.sorts).toEqual(config.sorts)
  })

  test("filters-only round-trips", () => {
    const config: ViewConfig = {
      filters: [{ propertyId: "p", operator: "contains", value: "v" }],
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.filters).toEqual(config.filters)
  })

  test("groupBy round-trips via group_by scalar", () => {
    const config: ViewConfig = { groupBy: "category" }
    const data = viewConfigToData(config)
    expect(data.group_by).toBe("category")
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.groupBy).toBe("category")
  })

  test("all fields together round-trip", () => {
    const config: ViewConfig = {
      sorts: [{ field: "name", direction: "asc" }],
      filters: [{ propertyId: "x", operator: "equals", value: 1 }],
      groupBy: "cat",
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.sorts).toEqual(config.sorts)
    expect(back.filters).toEqual(config.filters)
    expect(back.groupBy).toBe(config.groupBy)
  })

  test("triple round-trip stability: d→c→d→c→d converges", () => {
    const d0: ViewDataJSON = {
      version: 1,
      sorts: [
        { field: "a", direction: "asc" },
        { field: "b", direction: "desc" },
      ],
      filters: [{ propertyId: "p", operator: "equals", value: "v" }],
      group_by: "g",
    }
    const c1 = viewDataToConfig(d0)
    const d1 = viewConfigToData(c1)
    const c2 = viewDataToConfig({ version: 1, ...d1 })
    const d2 = viewConfigToData(c2)
    expect(d2.sorts).toEqual(d1.sorts)
    expect(d2.filters).toEqual(d1.filters)
    expect(d2.group_by).toBe(d1.group_by)
  })

  test("order of sorts preserved through round-trip", () => {
    const config: ViewConfig = {
      sorts: [
        { field: "z", direction: "asc" },
        { field: "y", direction: "desc" },
        { field: "x", direction: "asc" },
      ],
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.sorts?.map((s) => s.field)).toEqual(["z", "y", "x"])
  })

  test("order of filters preserved through round-trip", () => {
    const config: ViewConfig = {
      filters: [
        { propertyId: "f1", operator: "equals", value: 1 },
        { propertyId: "f2", operator: "gt", value: 2 },
      ],
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.filters?.map((f) => f.propertyId)).toEqual(["f1", "f2"])
  })

  test("empty ViewConfig round-trips to empty", () => {
    const data = viewConfigToData({})
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.sorts).toBeUndefined()
    expect(back.filters).toBeUndefined()
    expect(back.groupBy).toBeUndefined()
    expect(back.groupSorts).toBeUndefined()
  })

  test("groupSorts round-trips", () => {
    const config: ViewConfig = {
      groupBy: "status",
      groupSorts: [
        { field: "priority", direction: "desc" },
        { field: "created_at", direction: "asc" },
      ],
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.groupBy).toBe("status")
    expect(back.groupSorts).toEqual([
      { field: "priority", direction: "desc" },
      { field: "created_at", direction: "asc" },
    ])
  })

  test("groupSorts survives parseViewDataJSON → viewDataToConfig", () => {
    const config: ViewConfig = {
      groupBy: "status",
      groupSorts: [{ field: "priority", direction: "desc" }],
    }
    const data = viewConfigToData(config)
    const parsed = parseViewDataJSON({ version: 1, ...data })
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      const back = viewDataToConfig(parsed.data)
      expect(back.groupSorts).toEqual([{ field: "priority", direction: "desc" }])
    }
  })
})

describe("round-trip", () => {
  test("viewConfigToData(viewDataToConfig(data)) preserves semantic content", () => {
    const original: ViewDataJSON = {
      version: 1,
      sorts: [{ field: "name", direction: "desc" }],
      filters: [{ propertyId: "p1", operator: "contains", value: "test" }],
      group_by: "category",
    }
    const roundTripped = viewConfigToData(viewDataToConfig(original))
    expect(roundTripped.sorts).toEqual(original.sorts)
    expect(roundTripped.filters).toEqual(original.filters)
    expect(roundTripped.group_by).toBe(original.group_by)
  })
})

describe("integration smoke (parse → convert)", () => {
  test("realistic JSON string parses and converts into a usable ViewConfig", () => {
    const json = JSON.stringify({
      version: 1,
      layout: "table",
      visible_properties: ["title", "status", "priority"],
      sorts: [
        { field: "priority", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
      filters: [
        { propertyId: "status", operator: "equals", value: "open" },
        { propertyId: "priority", operator: "gt", value: 2 },
      ],
      group_by: "status",
    })

    const parsed = parseViewDataJSON(json)
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return

    const config = viewDataToConfig(parsed.data)
    expect(config.sorts).toHaveLength(2)
    expect(config.filters).toHaveLength(2)
    expect(config.groupBy).toBe("status")
    expect(config.sorts?.[0]?.field).toBe("priority")
    expect(config.sorts?.[0]?.direction).toBe("desc")
    expect(config.filters?.[0]?.propertyId).toBe("status")
  })

  test("legacy JSON (no version, direction:'manual') parses and normalizes", () => {
    const json = JSON.stringify({
      sorts: [{ field: "order", direction: "manual" }],
      filters: [{ propertyId: "active", operator: "equals", value: true }],
    })
    const parsed = parseViewDataJSON(json)
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.data.version).toBe(1)
    expect(parsed.data.sorts?.[0]?.direction).toBe("asc")

    const config = viewDataToConfig(parsed.data)
    expect(config.sorts?.[0]?.direction).toBe("asc")
    expect(config.filters?.[0]?.value).toBe(true)
  })

  test("invalid JSON from consumer path yields a typed error, not a crash", () => {
    const parsed = parseViewDataJSON("garbage")
    expect(parsed.ok).toBe(false)
    if (parsed.ok) return
    expect(["invalid_json", "validation_failed"]).toContain(parsed.error.type)
  })
})
