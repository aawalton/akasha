import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  defaultViewData,
  type ViewDataJSON,
  type ViewFilter,
  type ViewSort,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { pageQueryTimeIn } from "akasha/page/core/view/modules/page-query-times/page-query-times.module.code.ts"
import type {
  CreateViewArgs,
  DeleteViewArgs,
  DuplicateViewArgs,
  ReducerCtx,
  RenameViewArgs,
  ReorderViewsArgs,
  UpdateViewConfigArgs,
  ViewEffect,
  ViewRow,
} from "akasha/page/core/view-state/modules/view-state-change/view-state-change.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { inLowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"
import { groupGranularity } from "akasha/page/view/properties/group-granularity.select-property.ts"
import { layout } from "akasha/page/view/properties/layout.select-property.ts"

const NAV = "nav"

const PAGE_TYPE = "page-type"

const TODAY = "today"

const DAY = "eso-day"

const DAY_NEXT = "eso-day-next"

const NO_GRANULARITY = "none"

type PropertyWrite = { propertyId: string; value: unknown }

type Narrow = { key: string; comparison: string; values: string[] }

type KeyedSort = { key: string; descending: boolean }

function readViewPlace(row: ViewRow): number {
  const raw = row.properties.viewPlace
  return typeof raw === "number" ? raw : 0
}

function keyOf(field: string): string {
  return inLowerKebabCase(field)
}

function keysOf(fields: readonly string[] | undefined): string[] | undefined {
  return fields === undefined ? undefined : fields.map((one) => keyOf(one))
}

function sortsOf(sorts: readonly ViewSort[] | undefined): KeyedSort[] | undefined {
  if (sorts === undefined) return undefined
  return sorts.map((one) => ({ key: keyOf(one.field), descending: one.direction === "desc" }))
}

function listedIn(values: readonly string[], value: string | undefined): string | undefined {
  return value !== undefined && values.includes(value) ? value : undefined
}

function isToday(value: unknown): boolean {
  return isRecord(value) && value.sentinel === TODAY
}

function narrowTextOf(value: unknown): string | undefined {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return undefined
}

function boundTextOf(value: unknown): string | undefined {
  const text = narrowTextOf(value)
  if (text === undefined || text === "" || pageQueryTimeIn(text) !== null) return undefined
  return text
}

function narrowOf(filter: ViewFilter): Narrow | undefined {
  const key = keyOf(filter.propertyId)
  const value = filter.value
  const one = (comparison: string, text: string | undefined): Narrow | undefined =>
    text === undefined ? undefined : { key, comparison, values: [text] }
  const many = (comparison: string, list: readonly unknown[]): Narrow | undefined => {
    const values: string[] = []
    for (const each of list) {
      const text = narrowTextOf(each)
      if (text === undefined) return undefined
      values.push(text)
    }
    return { key, comparison, values }
  }
  switch (filter.operator) {
    case "equals":
      return one("is", narrowTextOf(value))
    case "contains":
      return one("contains", narrowTextOf(value))
    case "includes":
      return Array.isArray(value) ? many("in", value) : one("has", narrowTextOf(value))
    case "not_includes":
      return Array.isArray(value) ? many("not-in", value) : one("not-in", narrowTextOf(value))
    case "is_empty":
      return one("empty", "true")
    case "is_not_empty":
      return one("empty", "false")
    case "lt":
      return one("before", isToday(value) ? DAY : boundTextOf(value))
    case "lte":
      return isToday(value) ? one("before", DAY_NEXT) : undefined
    case "gte":
      return one("at-or-after", isToday(value) ? DAY : boundTextOf(value))
    case "gt":
      return isToday(value) ? one("at-or-after", DAY_NEXT) : undefined
    default:
      return undefined
  }
}

function narrowsOf(filters: readonly ViewFilter[] | undefined): Narrow[] | undefined {
  if (filters === undefined) return undefined
  const out: Narrow[] = []
  for (const filter of filters) {
    const narrow = narrowOf(filter)
    if (narrow !== undefined) out.push(narrow)
  }
  return out
}

function granularityOf(data: Partial<ViewDataJSON>): string | null | undefined {
  if (data.group_granularity === NO_GRANULARITY) return null
  return listedIn(groupGranularity.values, data.group_granularity)
}

function viewPropertiesOf(data: Partial<ViewDataJSON>): PropertyWrite[] {
  const written: PropertyWrite[] = []
  const put = (propertyId: string, value: unknown): undefined => {
    if (value !== undefined) written.push({ propertyId, value })
    return undefined
  }
  const cleared = (key: keyof ViewDataJSON): null | undefined =>
    key in data && data[key] === undefined ? null : undefined
  put("layout", listedIn(layout.values, data.layout))
  put(
    "pageType",
    data.pageTypeSlug === undefined ? undefined : namedAs(PAGE_TYPE, data.pageTypeSlug, null)
  )
  put("pageSize", data.page_size)
  put("itemPageSize", data.item_page_size)
  put("groupPageSize", data.group_page_size)
  put("groupBy", data.group_by === undefined ? cleared("group_by") : keyOf(data.group_by))
  put("groupGranularity", granularityOf(data))
  put("galleryCoverSource", data.gallery_cover_source ?? cleared("gallery_cover_source"))
  put("galleryCardSize", data.gallery_card_size)
  put("visibleProperties", keysOf(data.visible_properties))
  put("hiddenPropertiesOrder", keysOf(data.hidden_properties_order))
  put("alwaysShowProperties", keysOf(data.always_show_properties))
  put("viewSorts", sortsOf(data.sorts))
  put("groupSorts", sortsOf(data.group_sorts))
  put("narrows", narrowsOf(data.filters))
  return written
}

function slugForView(name: string, ownerNavSlug: string, taken: readonly ViewRow[]): string {
  const stem =
    name
      .replace(/&/g, "and")
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "view"
  const used = new Set(
    taken.map((one) => (typeof one.properties.slug === "string" ? one.properties.slug : ""))
  )
  const under = `${ownerNavSlug}-${stem}`
  if (!used.has(under)) return under
  for (let n = 2; ; n += 1) {
    const candidate = `${under}-${n}`
    if (!used.has(candidate)) return candidate
  }
}

function buildViewProperties(args: {
  name: string
  data: ViewDataJSON
  viewPlace: number
  ownerNavSlug: string
  taken: readonly ViewRow[]
}) {
  const written: { propertyId: string; value: unknown }[] = [
    { propertyId: "title", value: args.name },
    { propertyId: "slug", value: slugForView(args.name, args.ownerNavSlug, args.taken) },
    { propertyId: "nav", value: namedAs(NAV, args.ownerNavSlug, null) },
    { propertyId: "viewPlace", value: args.viewPlace },
  ]
  if (args.data.layout !== undefined) {
    written.push({ propertyId: "layout", value: args.data.layout })
  }
  if (args.data.pageTypeSlug !== undefined) {
    written.push({
      propertyId: "pageType",
      value: namedAs(PAGE_TYPE, args.data.pageTypeSlug, null),
    })
  }
  return written
}

export function createView(
  state: readonly ViewRow[],
  args: CreateViewArgs,
  ctx: ReducerCtx
): readonly ViewEffect[] {
  return [
    {
      kind: "createPage",
      pageId: ctx.newPageId,
      properties: buildViewProperties({
        name: args.name,
        data: args.data,
        viewPlace: state.length,
        ownerNavSlug: ctx.ownerNavSlug,
        taken: state,
      }),
    },
  ]
}

export function updateViewConfig(
  state: readonly ViewRow[],
  args: UpdateViewConfigArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  if (!state.some((v) => v._id === args.id)) return []
  const properties = viewPropertiesOf(args.updates)
  if (properties.length === 0) return []
  return [{ kind: "bulkSetProperties", pageId: args.id, properties }]
}

export function renameView(
  _state: readonly ViewRow[],
  args: RenameViewArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  return [
    {
      kind: "bulkSetProperties",
      pageId: args.id,
      properties: [{ propertyId: "title", value: args.name }],
    },
  ]
}

export function duplicateView(
  state: readonly ViewRow[],
  args: DuplicateViewArgs,
  ctx: ReducerCtx
): readonly ViewEffect[] {
  const sourceIndex = state.findIndex((v) => v._id === args.sourceId)
  if (sourceIndex < 0) return []
  const source = state[sourceIndex]
  if (!source) return []

  const sourceName = typeof source.properties.title === "string" ? source.properties.title : ""
  const newName = `${sourceName} (Copy)`
  const sourceData: ViewDataJSON = viewDataOfPage(source.properties) ?? defaultViewData()
  const named = buildViewProperties({
    name: newName,
    data: sourceData,
    viewPlace: sourceIndex + 1,
    ownerNavSlug: ctx.ownerNavSlug,
    taken: state,
  })
  const namedKeys = new Set(named.map((one) => one.propertyId))
  const settings = viewPropertiesOf(sourceData).filter(
    (one) => one.value !== null && !namedKeys.has(one.propertyId)
  )

  const effects: ViewEffect[] = [
    {
      kind: "createPage",
      pageId: ctx.newPageId,
      properties: [...named, ...settings],
    },
  ]

  for (let i = 0; i < state.length; i++) {
    if (i <= sourceIndex) continue
    const row = state[i]
    if (!row) continue
    effects.push({
      kind: "setProperty",
      pageId: row._id,
      propertyId: "viewPlace",
      value: readViewPlace(row) + 1,
    })
  }

  return effects
}

export function reorderViews(
  state: readonly ViewRow[],
  args: ReorderViewsArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  const known = new Set(state.map((v) => v._id))
  const effects: ViewEffect[] = []
  for (let i = 0; i < args.viewIds.length; i++) {
    const id = args.viewIds[i]
    if (id === undefined || !known.has(id)) continue
    effects.push({ kind: "setProperty", pageId: id, propertyId: "viewPlace", value: i })
  }
  return effects
}

export function deleteView(
  state: readonly ViewRow[],
  args: DeleteViewArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  if (!state.some((v) => v._id === args.id)) return []
  return [{ kind: "deletePage", pageId: args.id }]
}
