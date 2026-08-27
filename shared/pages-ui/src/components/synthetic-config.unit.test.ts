import { describe, expect, test } from "bun:test"
import {
  buildBaseFilters,
  buildSyntheticConfig,
  viewConfigToListingParams,
} from "./synthetic-config"

describe("buildBaseFilters", () => {
  test("single value emits equals filter", () => {
    expect(buildBaseFilters({ status: "done" })).toEqual([
      { propertyId: "status", operator: "equals", value: "done" },
    ])
  })

  test("comma-separated value emits includes filter with array", () => {
    expect(buildBaseFilters({ status: "exploration,problem" })).toEqual([
      { propertyId: "status", operator: "includes", value: ["exploration", "problem"] },
    ])
  })

  test("seven-status home-tile CSV emits includes filter (regression for #9815)", () => {
    expect(
      buildBaseFilters({
        status:
          "exploration,problem,plan,implementation,deployment,verification_automated,verification_user",
      })
    ).toEqual([
      {
        propertyId: "status",
        operator: "includes",
        value: [
          "exploration",
          "problem",
          "plan",
          "implementation",
          "deployment",
          "verification_automated",
          "verification_user",
        ],
      },
    ])
  })

  test("trims whitespace and drops empty parts", () => {
    expect(buildBaseFilters({ status: " done , , exploration " })).toEqual([
      { propertyId: "status", operator: "includes", value: ["done", "exploration"] },
    ])
  })

  test("CSV that collapses to a single non-empty part emits equals", () => {
    expect(buildBaseFilters({ status: "done,," })).toEqual([
      { propertyId: "status", operator: "equals", value: "done" },
    ])
  })

  test("all-empty CSV is skipped entirely", () => {
    expect(buildBaseFilters({ status: ",," })).toEqual([])
    expect(buildBaseFilters({ status: "" })).toEqual([])
  })

  test("ignores reserved view-config keys", () => {
    expect(
      buildBaseFilters({
        filters: "[]",
        sorts: "[]",
        groups: "x",
        groupSorts: "[]",
        groupGranularity: "week",
        pageSize: "20",
        groupPageSize: "20",
        itemPageSize: "20",
        q: "search text",
        status: "done",
      })
    ).toEqual([{ propertyId: "status", operator: "equals", value: "done" }])
  })

  test("multiple non-reserved keys each become a filter", () => {
    expect(buildBaseFilters({ status: "done", priority: "high,urgent" })).toEqual([
      { propertyId: "status", operator: "equals", value: "done" },
      { propertyId: "priority", operator: "includes", value: ["high", "urgent"] },
    ])
  })
})

describe("buildSyntheticConfig group_granularity", () => {
  test("parses a valid granularity param into group_granularity", () => {
    const config = buildSyntheticConfig({ groups: "dueDate", groupGranularity: "week" }, [])
    expect(config.group_granularity).toBe("week")
  })

  test("accepts every GroupGranularity enum value", () => {
    for (const g of ["none", "week", "month", "year"] as const) {
      expect(buildSyntheticConfig({ groupGranularity: g }, []).group_granularity).toBe(g)
    }
  })

  test("leaves group_granularity undefined when the param is absent", () => {
    expect(buildSyntheticConfig({ groups: "dueDate" }, []).group_granularity).toBeUndefined()
  })

  test("rejects an invalid granularity value (degrades to undefined)", () => {
    expect(
      buildSyntheticConfig({ groupGranularity: "fortnight" }, []).group_granularity
    ).toBeUndefined()
  })
})

describe("viewConfigToListingParams", () => {
  test("serializes group_by and groupGranularity to URL params", () => {
    const params = viewConfigToListingParams(
      { groupBy: "dueDate", groupGranularity: "week" },
      {},
      []
    )
    expect(params.get("groups")).toBe("dueDate")
    expect(params.get("groupGranularity")).toBe("week")
  })

  test("granularity round-trips through serialize -> parse", () => {
    const params = viewConfigToListingParams(
      { groupBy: "dueDate", groupGranularity: "month" },
      {},
      []
    )
    const reparsed = buildSyntheticConfig(Object.fromEntries(params), [])
    expect(reparsed.group_granularity).toBe("month")
    expect(reparsed.group_by).toBe("dueDate")
  })

  test("omits groupGranularity when unset", () => {
    const params = viewConfigToListingParams({ groupBy: "dueDate" }, {}, [])
    expect(params.has("groupGranularity")).toBe(false)
  })

  test("preserves non-reserved base params and verbatim q", () => {
    const params = viewConfigToListingParams({}, { someRelProp: "uuid-123", q: "hi" }, [])
    expect(params.get("someRelProp")).toBe("uuid-123")
    expect(params.get("q")).toBe("hi")
  })
})
