import { isRecord } from "../../../utils-narrow/src/is-record.ts"
import * as z from "zod"
import type { ReadonlyJSONValue } from "./pages.ts"
import type { GalleryCardSize } from "../view/gallery.ts"
import {
  type GranularLockKey,
  isFacetLocked,
  type LockedFacet,
  lockedFacetSchema,
} from "./view-data-locked.ts"

export const viewLayoutSchema = z.enum([
  "cards",
  "table",
  "grid",
  "board",
  "list",
  "calendar",
  "gallery",
  "notes",
  "timeline",
])

export const galleryCardSizeSchema = z.enum(["small", "medium", "large"])

const groupGranularitySchema = z.enum(["none", "week", "month", "year"])

export const viewSortSchema = z
  .object({
    field: z.string(),
    direction: z.enum(["asc", "desc"]),
  })
  .passthrough()

export const viewFilterSchema = z
  .object({
    propertyId: z.string(),
    operator: z.string(),
    value: z.unknown().optional(),
  })
  .passthrough()

const viewDataSchemaV1 = z.object({
  version: z.literal(1).optional().default(1),
  layout: viewLayoutSchema.optional(),
  visible_properties: z.array(z.string()).optional(),
  always_show_properties: z.array(z.string()).optional(),
  hidden_properties_order: z.array(z.string()).optional(),
  sorts: z.array(viewSortSchema).optional(),
  filters: z.array(viewFilterSchema).optional(),
  group_by: z.string().optional(),
  group_sorts: z.array(viewSortSchema).optional(),
  group_granularity: groupGranularitySchema.optional(),
  calendar_date_by: z.string().optional(),
  gallery_cover_source: z.string().optional(),
  gallery_card_size: galleryCardSizeSchema.optional(),
  notes_property: z.string().optional(),
  timeline_start_property: z.string().optional(),
  timeline_end_property: z.string().optional(),
  zones: z.record(z.string(), z.unknown()).optional(),
  pageTypeId: z.string().optional(),
  pageTypeSlug: z.string().optional(),
  crossTypeSource: z.object({ predicateKey: z.string() }).optional(),
  page_size: z.number().int().positive().optional(),
  group_page_size: z.number().int().positive().optional(),
  item_page_size: z.number().int().positive().optional(),
  locked: lockedFacetSchema.optional(),
  reorder: z.object({ verbId: z.string() }).optional(),
  title_properties: z.array(z.string()).optional(),
  title_properties_align: z.enum(["start", "end"]).default("start"),
})

export const DEFAULT_PAGE_SIZE = 12
export const DEFAULT_GROUP_PAGE_SIZE = 6
export const DEFAULT_ITEM_PAGE_SIZE = 12

export const viewDataSchema = viewDataSchemaV1

export type ViewLayout =
  | "cards"
  | "table"
  | "grid"
  | "board"
  | "list"
  | "calendar"
  | "gallery"
  | "notes"
  | "timeline"

export type GroupGranularity = "none" | "week" | "month" | "year"

export const GROUP_GRANULARITIES: readonly GroupGranularity[] = ["none", "week", "month", "year"]

export interface ViewSort {
  field: string
  direction: "asc" | "desc"
  [key: string]: unknown
}

export type ViewGroupSort = ViewSort

export interface ViewFilter {
  propertyId: string
  operator: string
  value?: ReadonlyJSONValue | undefined
  [key: string]: unknown
}

export interface ViewDataJSON {
  version: 1
  layout?: ViewLayout
  visible_properties?: readonly string[]
  always_show_properties?: readonly string[]
  hidden_properties_order?: readonly string[]
  sorts?: readonly ViewSort[]
  filters?: readonly ViewFilter[]
  group_by?: string
  group_sorts?: readonly ViewGroupSort[]
  group_granularity?: GroupGranularity
  calendar_date_by?: string
  gallery_cover_source?: string
  gallery_card_size?: GalleryCardSize
  notes_property?: string
  timeline_start_property?: string
  timeline_end_property?: string
  zones?: Record<string, unknown>
  pageTypeId?: string
  pageTypeSlug?: string
  crossTypeSource?: { predicateKey: string }
  page_size?: number
  group_page_size?: number
  item_page_size?: number
  locked?: LockedFacet
  reorder?: { verbId: string }
  title_properties?: readonly string[]
  title_properties_align?: "start" | "end"
}

export interface VisibilityChange {
  visibleProperties: readonly string[]
  hiddenPropertiesOrder: readonly string[]
  alwaysShowProperties: readonly string[]
}

export type PropertyVisibilityMode = "always-show" | "hide-when-empty" | "always-hide"

export function resolvePropertyVisibilityMode(
  id: string,
  lists: { visibleProperties: readonly string[]; alwaysShowProperties: readonly string[] }
): PropertyVisibilityMode {
  if (!lists.visibleProperties.includes(id)) return "always-hide"
  if (lists.alwaysShowProperties.includes(id)) return "always-show"
  return "hide-when-empty"
}

export interface ViewConfig {
  sorts?: readonly ViewSort[]
  filters?: readonly ViewFilter[]
  groupBy?: string
  groupSorts?: readonly ViewGroupSort[]
  groupGranularity?: GroupGranularity
  calendarDateBy?: string
  timelineStartProperty?: string
  timelineEndProperty?: string
  pageSize?: number
  groupPageSize?: number
  itemPageSize?: number
}

export type ViewDataParseError = {
  type: "invalid_json" | "validation_failed"
  message: string
  raw: string
}

function isRecordLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function migrateViewData(raw: unknown): unknown {
  if (!isRecordLike(raw)) return raw

  const obj: Record<string, unknown> = { ...raw }

  if (!("version" in obj)) {
    obj.version = 1
  }

  if (Array.isArray(obj.sorts)) {
    obj.sorts = obj.sorts.map((s: unknown) => {
      if (!isRecord(s)) return s
      if (s.direction === "manual") {
        return { ...s, direction: "asc" }
      }
      return s
    })
  }

  if ("groups" in obj && !("group_by" in obj)) {
    const legacy = obj.groups
    if (Array.isArray(legacy) && typeof legacy[0] === "string") {
      obj.group_by = legacy[0]
    }
    delete obj.groups
  }

  if (!("page_size" in obj)) obj.page_size = DEFAULT_PAGE_SIZE
  if (!("group_page_size" in obj)) obj.group_page_size = DEFAULT_GROUP_PAGE_SIZE
  if (!("item_page_size" in obj)) obj.item_page_size = DEFAULT_ITEM_PAGE_SIZE

  if (!("group_granularity" in obj)) obj.group_granularity = "none"

  return obj
}

export function defaultViewData(): ViewDataJSON {
  return {
    version: 1,
    layout: "cards",
    page_size: DEFAULT_PAGE_SIZE,
    group_page_size: DEFAULT_GROUP_PAGE_SIZE,
    item_page_size: DEFAULT_ITEM_PAGE_SIZE,
  }
}

export function isLocked(data: ViewDataJSON | undefined, key: GranularLockKey): boolean {
  return isFacetLocked(data?.locked, key)
}

export function isPageTypeLocked(data: ViewDataJSON | undefined): boolean {
  return isLocked(data, "pageType")
}

export function stripLockedFacet(data: ViewDataJSON): ViewDataJSON {
  if (data.locked === undefined) return data
  const { locked: _locked, ...rest } = data
  return rest
}

type ParseSuccess = { ok: true; data: ViewDataJSON }
type ParseFailure = { ok: false; error: ViewDataParseError }

function asViewDataJSON(value: z.infer<typeof viewDataSchema>): ViewDataJSON {
  return value as ViewDataJSON
}

export function parseViewDataJSON(input: unknown): ParseSuccess | ParseFailure {
  let parsed: unknown
  if (typeof input === "string") {
    try {
      parsed = z.unknown().parse(JSON.parse(input))
    } catch {
      return {
        ok: false,
        error: { type: "invalid_json", message: "Invalid JSON string", raw: input },
      }
    }
  } else {
    parsed = input
  }

  const migrated = migrateViewData(parsed)
  const result = viewDataSchema.safeParse(migrated)

  if (result.success) {
    return { ok: true, data: asViewDataJSON(result.data) }
  }

  return {
    ok: false,
    error: {
      type: "validation_failed",
      message: z.prettifyError(result.error),
      raw: typeof input === "string" ? input : JSON.stringify(input),
    },
  }
}

export function viewDataToConfig(data: ViewDataJSON): ViewConfig {
  return {
    sorts: data.sorts,
    filters: data.filters,
    groupBy: data.group_by,
    groupSorts: data.group_sorts,
    groupGranularity: data.group_granularity,
    calendarDateBy: data.calendar_date_by,
    timelineStartProperty: data.timeline_start_property,
    timelineEndProperty: data.timeline_end_property,
    pageSize: data.page_size,
    groupPageSize: data.group_page_size,
    itemPageSize: data.item_page_size,
  }
}

export function viewConfigToData(config: ViewConfig): Partial<ViewDataJSON> {
  return {
    sorts: config.sorts ? [...config.sorts] : undefined,
    filters: config.filters ? [...config.filters] : undefined,
    group_by: config.groupBy,
    group_sorts: config.groupSorts ? [...config.groupSorts] : undefined,
    group_granularity: config.groupGranularity,
    calendar_date_by: config.calendarDateBy,
    timeline_start_property: config.timelineStartProperty,
    timeline_end_property: config.timelineEndProperty,
    page_size: config.pageSize,
    group_page_size: config.groupPageSize,
    item_page_size: config.itemPageSize,
  }
}
