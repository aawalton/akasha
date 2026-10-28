import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import type {
  ViewConfig,
  ViewFilter,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { useViewLocalConfig } from "akasha/page/ui/component/modules/use-view-local-config/use-view-local-config.module.code.ts"

test("a view's saved group granularity is the granularity its local config starts with", () => {
  const drawn = renderHook(() =>
    useViewLocalConfig({ defaultGroupBy: "date", defaultGroupGranularity: "week" })
  )
  expect(drawn.result.current.viewConfig.groupGranularity).toBe("week")
  drawn.unmount()
})

test("a granularity picked is kept and handed on to be saved", () => {
  const saved: ViewConfig[] = []
  const drawn = renderHook(() =>
    useViewLocalConfig({ defaultGroupBy: "date", defaultGroupGranularity: "week" }, (config) =>
      saved.push(config)
    )
  )
  act(() => {
    drawn.result.current.onViewConfigChange({
      ...drawn.result.current.viewConfig,
      groupGranularity: "month",
    })
  })
  expect(drawn.result.current.viewConfig.groupGranularity).toBe("month")
  expect(saved.at(-1)?.groupGranularity).toBe("month")
  drawn.unmount()
})

const NARROWS: readonly ViewFilter[] = [
  { propertyId: "completion", operator: "not_includes", value: ["completed"] },
  { propertyId: "progressedAt", operator: "lt_or_empty", value: { sentinel: "today" } },
]

type Stated = { readonly filters: readonly ViewFilter[] | undefined }

const UNREAD: Stated = { filters: undefined }

test("a view's filters read after the view is drawn are the filters its local config holds", () => {
  const drawn = renderHook(
    ({ filters }: Stated) => useViewLocalConfig({ defaultFilters: filters }),
    { initialProps: UNREAD }
  )
  expect(drawn.result.current.viewConfig.filters).toEqual([])
  drawn.rerender({ filters: NARROWS })
  expect(drawn.result.current.viewConfig.filters).toEqual(NARROWS)
  drawn.unmount()
})

test("filters a person changed are kept when the view's filters are read again", () => {
  const drawn = renderHook(
    ({ filters }: Stated) => useViewLocalConfig({ defaultFilters: filters }),
    { initialProps: { filters: NARROWS } }
  )
  act(() => {
    drawn.result.current.onViewConfigChange({ ...drawn.result.current.viewConfig, filters: [] })
  })
  drawn.rerender({ filters: NARROWS.slice(0, 1) })
  expect(drawn.result.current.viewConfig.filters).toEqual([])
  drawn.unmount()
})

test("a change to another setting keeps the saved granularity", () => {
  const saved: ViewConfig[] = []
  const drawn = renderHook(() =>
    useViewLocalConfig({ defaultGroupBy: "date", defaultGroupGranularity: "week" }, (config) =>
      saved.push(config)
    )
  )
  act(() => {
    drawn.result.current.onViewConfigChange({
      ...drawn.result.current.viewConfig,
      sorts: [{ field: "date", direction: "asc" }],
    })
  })
  expect(saved.at(-1)?.groupGranularity).toBe("week")
  drawn.unmount()
})
