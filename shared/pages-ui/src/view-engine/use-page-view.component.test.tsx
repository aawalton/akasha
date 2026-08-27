import { describe, expect, test } from "bun:test"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { ViewConfig } from "@shared/pages-core/schema/view-data"
import { act, renderHook } from "@shared/utils-test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { usePageView } from "./use-page-view"

const SEQ_DEF: PropertyDefinition = { id: "seq", title: "Sequence", type: "number", config: {} }
const CREATED_AT_DEF: PropertyDefinition = {
  id: "createdAt",
  title: "Created At",
  type: "number",
  config: {},
}

describe("usePageView — universal columns flow through `properties`", () => {
  test("sortOptions exposes seq + createdAt when caller passes the universal defs", () => {
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [SEQ_DEF, CREATED_AT_DEF],
        viewConfig: {},
        onViewConfigChange: () => {},
      })
    )
    const ids = result.current.sortOptions.map((o) => o.value)
    expect(ids).toContain("seq")
    expect(ids).toContain("createdAt")
  })

  test("filterDimensions exposes seq with numeric operators", () => {
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [SEQ_DEF],
        viewConfig: {},
        onViewConfigChange: () => {},
      })
    )
    const seqDim = result.current.filterDimensions.find((d) => d.id === "seq")
    expect(seqDim).toBeDefined()
    expect(seqDim?.type).toBe("number")
    const opValues = seqDim?.operators.map((o) => o.value) ?? []
    expect(opValues).toContain("lte")
    expect(opValues).toContain("gte")
    expect(opValues).toContain("gt")
    expect(opValues).toContain("lt")
    expect(opValues).toContain("equals")
  })

  test("groupOptions reflects effective groupability of universal defs (number seq excluded by default; opt-in surfaces it)", () => {
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [SEQ_DEF],
        viewConfig: {},
        onViewConfigChange: () => {},
      })
    )
    expect(result.current.groupOptions.map((o) => o.value)).not.toContain("seq")

    const { result: opted } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [{ ...SEQ_DEF, groupable: true }],
        viewConfig: {},
        onViewConfigChange: () => {},
      })
    )
    expect(opted.current.groupOptions.map((o) => o.value)).toContain("seq")
  })

  test("onGroupByChange('') emits viewConfig with groupBy: '' (clear sentinel, not undefined)", () => {
    let captured: ViewConfig | undefined
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [SEQ_DEF],
        viewConfig: { groupBy: "seq" },
        onViewConfigChange: (c) => {
          captured = c
        },
      })
    )
    act(() => {
      result.current.onGroupByChange("")
    })
    expect(captured?.groupBy).toBe("")
    expect(captured?.groupBy).not.toBeUndefined()
  })

  test("onReset emits viewConfig with groupBy: '' (clear sentinel, not undefined)", () => {
    let captured: ViewConfig | undefined
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [SEQ_DEF],
        viewConfig: { groupBy: "seq" },
        onViewConfigChange: (c) => {
          captured = c
        },
      })
    )
    act(() => {
      result.current.onReset()
    })
    expect(captured?.groupBy).toBe("")
    expect(captured?.groupBy).not.toBeUndefined()
  })

  test("rollup targeting universal seq exposes numeric operators via filterDimensions", () => {
    const sourceTypeId = "t_workflow"
    const targetTypeId = "t_pipeline"
    const rollupDef: PropertyDefinition = {
      id: "pipelineNumber",
      title: "Pipeline Number",
      type: "rollup",
      config: { relationPropertyId: "pipeline", targetPropertyId: "seq" },
    }
    const relationDef: PropertyDefinition = {
      id: "pipeline",
      title: "Pipeline",
      type: "relation",
      config: { targetPageTypeId: targetTypeId },
    }
    const propertiesByPageType: PageTypePropertiesMap = new Map([
      [sourceTypeId, [relationDef, rollupDef]],
      [targetTypeId, [SEQ_DEF]],
    ])
    const { result } = renderHook(() =>
      usePageView({
        pages: [],
        properties: [relationDef, rollupDef],
        viewConfig: {},
        onViewConfigChange: () => {},
        pageTypeId: sourceTypeId,
        propertiesByPageType,
      })
    )
    const dim = result.current.filterDimensions.find((d) => d.id === "pipelineNumber")
    expect(dim).toBeDefined()
    expect(dim?.type).toBe("number")
    const opValues = dim?.operators.map((o) => o.value) ?? []
    expect(opValues).toContain("lte")
    expect(opValues).toContain("gte")
  })
})
