import { describe, expect, test } from "bun:test"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import { act, renderHook } from "@shared/utils-test"
import type { ViewConfig } from "@shared/pages-core/schema/view-data"
import { useViewConfigHandlers } from "./use-view-config-handlers"

describe("useViewConfigHandlers — handleConfigChange persists group sorts", () => {
  test("forwards groupSorts to onUpdateView as group_sorts", () => {
    const calls: Array<{ id: string; updates: Partial<ViewDataJSON> }> = []
    const onUpdateView = (id: string, updates: Partial<ViewDataJSON>) => {
      calls.push({ id, updates })
    }

    const { result } = renderHook(() => useViewConfigHandlers({ onUpdateView, viewId: "view-1" }))

    const config: ViewConfig = {
      groupBy: "status",
      groupSorts: [{ field: "status", direction: "desc" }],
    }

    act(() => {
      result.current.handleConfigChange(config)
    })

    expect(calls).toHaveLength(1)
    expect(calls[0]?.updates.group_sorts).toEqual([{ field: "status", direction: "desc" }])
  })
})

describe("useViewConfigHandlers — handleConfigChange persists group granularity", () => {
  test("forwards groupGranularity to onUpdateView as group_granularity", () => {
    const calls: Array<{ id: string; updates: Partial<ViewDataJSON> }> = []
    const onUpdateView = (id: string, updates: Partial<ViewDataJSON>) => {
      calls.push({ id, updates })
    }

    const { result } = renderHook(() => useViewConfigHandlers({ onUpdateView, viewId: "view-1" }))

    const config: ViewConfig = {
      groupBy: "due",
      groupGranularity: "month",
    }

    act(() => {
      result.current.handleConfigChange(config)
    })

    expect(calls).toHaveLength(1)
    expect(calls[0]?.updates.group_granularity).toBe("month")
  })
})

describe("useViewConfigHandlers — handleConfigChange persists filters verbatim (no clobber)", () => {
  test("a group_by change forwards a hand-set equals+scalar filter unchanged", () => {
    const calls: Array<{ id: string; updates: Partial<ViewDataJSON> }> = []
    const onUpdateView = (id: string, updates: Partial<ViewDataJSON>) => {
      calls.push({ id, updates })
    }

    const { result } = renderHook(() => useViewConfigHandlers({ onUpdateView, viewId: "view-1" }))

    const config: ViewConfig = {
      groupBy: "relationshipLevel",
      filters: [
        {
          propertyId: "persona",
          operator: "equals",
          value: "019eb7f9-816c-7d5a-bf13-8f40b5e7ec79",
        },
        { propertyId: "kind", operator: "not_includes", value: ["wallpaper"] },
      ],
    }

    act(() => {
      result.current.handleConfigChange(config)
    })

    expect(calls).toHaveLength(1)
    expect(calls[0]?.updates.group_by).toBe("relationshipLevel")
    expect(calls[0]?.updates.filters).toEqual([
      { propertyId: "persona", operator: "equals", value: "019eb7f9-816c-7d5a-bf13-8f40b5e7ec79" },
      { propertyId: "kind", operator: "not_includes", value: ["wallpaper"] },
    ])
  })
})
