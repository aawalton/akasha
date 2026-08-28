import { isPromotedKey, PROMOTED_COLUMN } from "@shared/pages-access/routing-core"
import { type AggregateConfig, type AggregateFunction, computeAggregate } from "@shared/pages-core/property-types/aggregate"
import { computeRollup, type PageTypePropertiesMap, parseRollupConfig } from "@shared/pages-core/property-types/rollup"
import { type PageDataJSON, type PropertyDefinition } from "@shared/pages-core/types"
import { asPageRecord, asRecord, type PageRow } from "../collection/page-row.ts"
import { emitStoreDiagnostic } from "../diagnostics.ts"

const warnedUnacquiredTargets = new Set<string>()

function noteUnacquiredTargetIfMissing(
  key: string,
  targetId: unknown,
  ctx: ViewResolveCtx
): undefined {
  if (typeof targetId !== "string" || targetId.length === 0) return
  if (ctx.livePageById.has(targetId)) return
  if (warnedUnacquiredTargets.has(key)) return
  warnedUnacquiredTargets.add(key)
  emitStoreDiagnostic({
    reason: "unacquired-sort-target",
    message: `[view-sort] sort key '${key}' resolves through target page '${targetId}' absent from the mirror — its page-type slug was not acquired, so the key cannot discriminate`,
    detail: `key=${key} targetId=${targetId} — deriveViewTargetSlugs likely missed this target type (#15778)`,
  })
}

export type SortValue = number | string | boolean | null

function asSortValue(value: unknown): SortValue {
  return value as SortValue
}
function asAggregateFunction(fn: string): AggregateFunction {
  return fn as AggregateFunction
}
function asPageDataJSON(data: Record<string, unknown>): PageDataJSON {
  return data as PageDataJSON
}

export interface KeyInfo {
  readonly kind: "promoted" | "stored" | "rollup" | "aggregate" | "unknown"
  readonly type?: string
}

export interface ViewResolveCtx {
  readonly keyInfo: ReadonlyMap<string, KeyInfo>
  readonly defsById: ReadonlyMap<string, PropertyDefinition>
  readonly livePageById: ReadonlyMap<string, PageRow>
  readonly allData: readonly { readonly id: string; readonly data: PageDataJSON }[]
  readonly pageTypes: PageTypePropertiesMap
}

const AGGREGATE_FUNCTIONS: ReadonlySet<string> = new Set([
  "sum",
  "count",
  "avg",
  "min",
  "max",
  "first",
  "count_distinct",
])

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function attributesOf(row: PageRow): Readonly<Record<string, unknown>> {
  const raw = asPageRecord(row).attributes
  if (raw !== null && typeof raw === "object" && !Array.isArray(raw)) {
    return asRecord(raw)
  }
  return {}
}

export function pageDataOf(row: PageRow): PageDataJSON {
  const rec = asPageRecord(row)
  return asPageDataJSON({
    ...attributesOf(row),
    id: rec.id,
    seq: rec.seq,
    title: rec.title,
    icon: rec.icon,
    slug: rec.slug,
    pageTypeId: rec.page_type_id,
    pageTypeSlug: rec.page_type_slug,
  })
}

export function classifyKey(
  key: string,
  defsById: ReadonlyMap<string, PropertyDefinition>
): KeyInfo {
  if (isPromotedKey(key)) return { kind: "promoted" }
  const def = defsById.get(key)
  if (def === undefined) return { kind: "unknown" }
  if (def.type === "rollup") return { kind: "rollup" }
  if (def.type === "aggregate") return { kind: "aggregate" }
  return { kind: "stored", type: def.type }
}

export function coerceInstantMs(value: unknown): number | null {
  if (typeof value === "number") return Number.isNaN(value) ? null : value
  if (typeof value === "string") {
    const ms = Date.parse(value)
    return Number.isNaN(ms) ? null : ms
  }
  return null
}

function promotedValue(row: PageRow, key: string): SortValue {
  if (!isPromotedKey(key)) return null
  const v = asPageRecord(row)[PROMOTED_COLUMN[key]]
  if (v === undefined || v === null) return null
  return asSortValue(v)
}

function storedRawValue(row: PageRow, key: string): SortValue {
  const attrs = attributesOf(row)
  if (!(key in attrs)) return null
  const v = attrs[key]
  if (v === null) return null
  return asSortValue(v)
}

function instantValue(row: PageRow, key: string): SortValue {
  const attrs = attributesOf(row)
  if (!(key in attrs)) return null
  const v = attrs[key]
  if (v === null) return null
  return coerceInstantMs(v)
}

function relationValue(row: PageRow, key: string, ctx: ViewResolveCtx): SortValue {
  const raw = attributesOf(row)[key]
  if (typeof raw === "string" && UUID_RE.test(raw)) {
    const target = ctx.livePageById.get(raw)
    if (target !== undefined) {
      const sortOrder = attributesOf(target).sortOrder
      if (typeof sortOrder === "number") return sortOrder
      const title = asPageRecord(target).title
      if (title !== null && title !== undefined) return asSortValue(title)
    } else {
      noteUnacquiredTargetIfMissing(key, raw, ctx)
    }
  }
  if (raw === undefined || raw === null) return null
  return asSortValue(raw)
}

function normalizeScalar(value: unknown): SortValue {
  if (value === null || value === undefined) return null
  if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
    return value
  }
  return null
}

function rollupValue(row: PageRow, key: string, ctx: ViewResolveCtx): SortValue {
  const def = ctx.defsById.get(key)
  const config = def === undefined ? null : parseRollupConfig(def.config)
  if (config === null) return null
  const data = pageDataOf(row)
  const value = normalizeScalar(computeRollup(config, data, ctx.allData, ctx.pageTypes))
  if (value === null) noteUnacquiredTargetIfMissing(key, data[config.relationPropertyId], ctx)
  return value
}

function parseAggregateConfigLocal(raw: PropertyDefinition["config"]): AggregateConfig | null {
  if (raw === undefined) return null
  const rel = raw.relationPropertyId
  const fn = raw.function
  if (typeof rel !== "string") return null
  if (typeof fn !== "string" || !AGGREGATE_FUNCTIONS.has(fn)) return null
  const aggFn = asAggregateFunction(fn)
  const tgt = raw.targetPropertyId
  if (typeof tgt !== "string") {
    if (fn === "count") return { relationPropertyId: rel, targetPropertyId: "", function: aggFn }
    return null
  }
  return { relationPropertyId: rel, targetPropertyId: tgt, function: aggFn }
}

function aggregateValue(row: PageRow, key: string, ctx: ViewResolveCtx): SortValue {
  const def = ctx.defsById.get(key)
  const config = def === undefined ? null : parseAggregateConfigLocal(def.config)
  if (config === null) return null
  return computeAggregate(config, pageDataOf(row), ctx.allData)
}

export function resolveSortValue(row: PageRow, key: string, ctx: ViewResolveCtx): SortValue {
  const info = ctx.keyInfo.get(key)
  if (info === undefined || info.kind === "promoted") return promotedValue(row, key)
  switch (info.kind) {
    case "rollup":
      return rollupValue(row, key, ctx)
    case "aggregate":
      return aggregateValue(row, key, ctx)
    case "stored":
      if (info.type === "relation") return relationValue(row, key, ctx)
      if (info.type === "instant") return instantValue(row, key)
      return storedRawValue(row, key)
    default:
      return null
  }
}

function typeRank(value: number | string | boolean): number {
  if (typeof value === "string") return 1
  if (typeof value === "number") return 2
  return 3
}

export function jsonbCompare(a: number | string | boolean, b: number | string | boolean): number {
  const ra = typeRank(a)
  const rb = typeRank(b)
  if (ra !== rb) return ra < rb ? -1 : 1
  if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0
  if (typeof a === "number" && typeof b === "number") return a < b ? -1 : a > b ? 1 : 0
  if (typeof a === "boolean" && typeof b === "boolean") return a === b ? 0 : a ? 1 : -1
  return 0
}

function compareWithNulls(a: SortValue, b: SortValue, dir: "asc" | "desc"): number {
  const aNull = a === null
  const bNull = b === null
  if (aNull && bNull) return 0
  if (aNull) return dir === "asc" ? -1 : 1
  if (bNull) return dir === "asc" ? 1 : -1
  const c = jsonbCompare(a, b)
  return dir === "asc" ? c : -c
}

export interface ViewSortClause {
  readonly by: string
  readonly dir: "asc" | "desc"
}

export function makeViewComparator(
  sorts: readonly ViewSortClause[],
  ctx: ViewResolveCtx
): (a: PageRow, b: PageRow) => number {
  return (a, b) => {
    for (const clause of sorts) {
      const va = resolveSortValue(a, clause.by, ctx)
      const vb = resolveSortValue(b, clause.by, ctx)
      const c = compareWithNulls(va, vb, clause.dir)
      if (c !== 0) return c
    }
    return compareWithNulls(a.id, b.id, "asc")
  }
}
