import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import type { ViewConfig } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
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
