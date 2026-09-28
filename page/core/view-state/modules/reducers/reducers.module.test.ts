import { describe, expect, it } from "bun:test"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  duplicateView,
  updateViewConfig,
} from "akasha/page/core/view-state/modules/reducers/reducers.module.code.ts"
import type {
  ViewEffect,
  ViewRow,
} from "akasha/page/core/view-state/modules/view-state-change/view-state-change.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { nav } from "akasha/page/nav/nav.page-type.ts"
import { tasks } from "akasha/page/nav/pages/tasks.nav.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"
import { view } from "akasha/page/view/view.page-type.ts"

const PAGE_TYPE = "page-type"
const VIEW_ID = "01a06577-2615-700c-86d0-3503613a322f"
const CTX = { newPageId: "01a06577-2615-700c-86d0-3503613a3230", ownerNavSlug: tasks.slug }
const TODAY = { sentinel: "today" }

const SAVED: Record<string, unknown> = {
  id: VIEW_ID,
  slug: "tasks-today",
  title: "Today",
  nav: namedAs(nav.slug, tasks.slug, null),
  pageType: namedAs(PAGE_TYPE, view.slug, null),
  viewPlace: 0,
  layout: "cards",
  pageSize: 40,
}

const ROWS: readonly ViewRow[] = [{ _id: VIEW_ID, properties: SAVED }]

const CHANGED = {
  version: 1,
  layout: "table",
  pageTypeSlug: nav.slug,
  page_size: 25,
  item_page_size: 8,
  group_page_size: 4,
  sorts: [
    { field: "priority", direction: "desc" },
    { field: "toDoDueDate", direction: "asc" },
  ],
  filters: [
    { propertyId: "toDoDueDate", operator: "lte", value: TODAY },
    { propertyId: "toDoCompletedAt", operator: "is_empty" },
    { propertyId: "status", operator: "includes", value: ["In Progress", "Following"] },
    { propertyId: "priority", operator: "equals", value: "high" },
  ],
  group_by: "toDoCategory",
  group_sorts: [{ field: "toDoCategory", direction: "desc" }],
  group_granularity: "week",
  visible_properties: ["priority", "toDoDueDate", "link"],
  hidden_properties_order: ["toDoSortOrder"],
  always_show_properties: ["priority"],
} satisfies ViewDataJSON

function applied(
  properties: Readonly<Record<string, unknown>>,
  effects: readonly ViewEffect[]
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...properties }
  for (const effect of effects) {
    if (effect.kind !== "bulkSetProperties") throw new Error(`unexpected ${effect.kind}`)
    expect(effect.pageId).toBe(VIEW_ID)
    for (const one of effect.properties) {
      if (one.value === null) delete out[one.propertyId]
      else out[one.propertyId] = one.value
    }
  }
  return out
}

function roundTripped(updates: Partial<ViewDataJSON>): ViewDataJSON | undefined {
  const effects = updateViewConfig(ROWS, { id: VIEW_ID, updates }, CTX)
  return viewDataOfPage(applied(SAVED, effects))
}

describe("updateViewConfig", () => {
  it("writes settings as the flat view properties viewDataOfPage reads back", () => {
    const back = roundTripped(CHANGED)
    expect(back).toMatchObject({
      layout: CHANGED.layout,
      pageTypeSlug: CHANGED.pageTypeSlug,
      page_size: CHANGED.page_size,
      item_page_size: CHANGED.item_page_size,
      group_page_size: CHANGED.group_page_size,
      sorts: CHANGED.sorts,
      filters: CHANGED.filters,
      group_by: CHANGED.group_by,
      group_sorts: CHANGED.group_sorts,
      group_granularity: CHANGED.group_granularity,
      visible_properties: CHANGED.visible_properties,
      hidden_properties_order: CHANGED.hidden_properties_order,
      always_show_properties: CHANGED.always_show_properties,
    })
  })

  it("keeps each bound on today as the bound it was", () => {
    const filters = [
      { propertyId: "dueDate", operator: "lt", value: TODAY },
      { propertyId: "dueDate", operator: "lte", value: TODAY },
      { propertyId: "dueDate", operator: "gt", value: TODAY },
      { propertyId: "dueDate", operator: "gte", value: TODAY },
    ]
    expect(roundTripped({ filters })?.filters).toEqual(filters)
  })

  it("leaves a setting no update names as it is", () => {
    const back = roundTripped({ sorts: [{ field: "title", direction: "asc" }] })
    expect(back?.page_size).toBe(40)
    expect(back?.layout).toBe("cards")
    expect(back?.pageTypeSlug).toBe(view.slug)
  })

  it("clears the grouping an update takes away", () => {
    const grouped = applied(
      SAVED,
      updateViewConfig(ROWS, { id: VIEW_ID, updates: { group_by: "status" } }, CTX)
    )
    const rows: readonly ViewRow[] = [{ _id: VIEW_ID, properties: grouped }]
    const effects = updateViewConfig(
      rows,
      { id: VIEW_ID, updates: { group_by: undefined, group_granularity: "none" } },
      CTX
    )
    const back = viewDataOfPage(applied(grouped, effects))
    expect(back?.group_by).toBeUndefined()
    expect(back?.group_granularity).toBeUndefined()
  })
})

describe("duplicateView", () => {
  it("carries the source view's settings onto the copy", () => {
    const source = applied(SAVED, updateViewConfig(ROWS, { id: VIEW_ID, updates: CHANGED }, CTX))
    const effects = duplicateView(
      [{ _id: VIEW_ID, properties: source }],
      { sourceId: VIEW_ID },
      CTX
    )
    const created = effects[0]
    if (created?.kind !== "createPage") throw new Error("expected a createPage effect first")
    const copy: Record<string, unknown> = {}
    for (const one of created.properties ?? []) copy[one.propertyId] = one.value
    expect(viewDataOfPage(copy)).toEqual(viewDataOfPage(source))
  })
})
