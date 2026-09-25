import { type Collection, createLiveQueryCollection } from "@tanstack/db"
import { instantIn } from "akasha/code/type/narrowing/modules/instant-in/instant-in.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  asPageRecord,
  asPageRowList,
  asRecord,
  attributesOf,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import {
  type BoolExpr,
  conditionToExpr,
  constTrue,
} from "akasha/page/ui-store/query/modules/condition-expr/condition-expr.module.code.ts"
import {
  classifyKey,
  type KeyInfo,
  makeViewComparator,
  pageDataOf,
  type ViewResolveCtx,
  type ViewSortClause,
} from "akasha/page/ui-store/query/modules/sort-resolve/sort-resolve.module.code.ts"
import {
  type ResolvedOverlay,
  viewMatchesRow,
} from "akasha/page/ui-store/query/modules/view-match/view-match.module.code.ts"
import type { UseViewQueryOptions } from "akasha/page/ui-store/sql/modules/options/options.module.code.ts"

const LOCAL_VIEW_QUERY_LIMIT = 10_000
const ALIAS = "p"
const noop = (): undefined => {}
const PAGE_TYPE_SLUG = "page-type"

function asPropertyDefinition(entry: Readonly<Record<string, unknown>>): PropertyDefinition {
  return entry as PropertyDefinition
}

export interface ViewResult {
  readonly rows: readonly PageRow[]
  readonly totalCount: number
  readonly isLoading: boolean
  readonly hasMore: false
  readonly loadMore: () => undefined
  readonly error: Error | null
  readonly hydratedCount: number
  readonly ensureHydratedUpTo: () => undefined
}

interface ViewPipeline {
  readonly read: () => ViewResult
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

function readDefs(row: PageRow): readonly PropertyDefinition[] {
  const raw = attributesOf(row).propertyDefinitions
  if (!Array.isArray(raw)) return []
  const out: PropertyDefinition[] = []
  for (const entry of raw) {
    if (!isRecord(entry)) continue
    const id = entry.id
    const type = entry.type
    if (typeof id !== "string" || typeof type !== "string") continue
    out.push(asPropertyDefinition(entry))
  }
  return out
}

function isPageTypeRow(row: PageRow): boolean {
  return asPageRecord(row).page_type_slug === PAGE_TYPE_SLUG
}

function buildViewResolveCtx(
  all: readonly PageRow[],
  options: UseViewQueryOptions
): ViewResolveCtx {
  let ownDefs: readonly PropertyDefinition[] = []
  for (const row of all) {
    if (!isPageTypeRow(row)) continue
    const id = asPageRecord(row).id
    if (typeof id !== "string") continue
    if (id === options.pageTypeId) ownDefs = readDefs(row)
  }

  const defsById = new Map<string, PropertyDefinition>()
  for (const def of ownDefs) defsById.set(def.id, def)

  const keyInfo = new Map<string, KeyInfo>()
  for (const key of collectReferencedKeys(options)) keyInfo.set(key, classifyKey(key, defsById))

  const livePageById = new Map<string, PageRow>()
  for (const row of all) {
    const id = asPageRecord(row).id
    if (typeof id !== "string") continue
    livePageById.set(id, row)
  }

  return { keyInfo, defsById, livePageById }
}

function deriveInstantKeys(ctx: ViewResolveCtx): readonly string[] {
  return [...ctx.keyInfo].filter(([, info]) => info.type === "instant").map(([key]) => key)
}

function deriveContentKeys(ctx: ViewResolveCtx): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const [keyId, def] of ctx.defsById) {
    if (def.storage === "content") keys.add(keyId)
  }
  return keys
}

function deriveRichDocumentKeys(ctx: ViewResolveCtx): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const [keyId, def] of ctx.defsById) {
    if (def.type === "rich-document") keys.add(keyId)
  }
  return keys
}

function baseScope(options: UseViewQueryOptions): BoolExpr {
  if (options.crossType === true) return constTrue(ALIAS)
  const typeExpr = conditionToExpr({ key: "pageTypeId", eq: options.pageTypeId }, ALIAS)
  if (typeExpr === null) {
    throw new Error("view-pipeline: base scope predicate failed to lower")
  }
  return typeExpr
}

function instantOverlay(row: PageRow, instantKeys: readonly string[]): ResolvedOverlay {
  const overlay: Record<string, number | null> = {}
  const attrs = attributesOf(row)
  for (const key of instantKeys) overlay[key] = instantIn(attrs[key])
  return overlay
}

function viewMatches(
  row: PageRow,
  filters: PageWhere,
  instantKeys: readonly string[],
  materializedKeys: ReadonlySet<string>,
  contentKeys: ReadonlySet<string>,
  richDocumentKeys: ReadonlySet<string>
): boolean {
  const page = asRecord(pageDataOf(row))
  const resolved = instantOverlay(row, instantKeys)
  return viewMatchesRow(page, filters, resolved, materializedKeys, contentKeys, richDocumentKeys)
}

function collectMaterializedKeys(options: UseViewQueryOptions): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const s of options.sorts ?? []) keys.add(s.by)
  for (const cond of options.filters ?? []) {
    if ("or" in cond) continue
    keys.add(cond.key)
  }
  for (const k of options.resolveKeys ?? []) keys.add(k)
  return keys
}

function toSortClauses(options: UseViewQueryOptions): readonly ViewSortClause[] {
  return (options.sorts ?? []).map((s) => ({ by: s.by, dir: s.dir === "desc" ? "desc" : "asc" }))
}

function collectReferencedKeys(options: UseViewQueryOptions): readonly string[] {
  const keys = new Set<string>()
  for (const s of options.sorts ?? []) keys.add(s.by)
  const walk = (cond: PageWhere[number]): undefined => {
    if ("or" in cond) {
      for (const arm of cond.or) walk(arm)
      return
    }
    keys.add(cond.key)
  }
  for (const cond of options.filters ?? []) walk(cond)
  return [...keys]
}

export function createViewPipeline(
  collection: Collection<PageRow, string>,
  options: UseViewQueryOptions
): ViewPipeline {
  const snapshot = (): readonly PageRow[] => asPageRowList(collection.toArray)
  const sorts = toSortClauses(options)
  const filters = options.filters ?? []
  const limit = options.limit ?? LOCAL_VIEW_QUERY_LIMIT

  const materializedKeys = collectMaterializedKeys(options)

  const live = createLiveQueryCollection({
    startSync: true,
    query: (q) =>
      q
        .from({ p: collection })
        .where(() => baseScope(options))
        .select(({ p }) => ({ ...p })),
  })

  const read = (): ViewResult => {
    const ctx = buildViewResolveCtx(snapshot(), options)
    const instantKeys = deriveInstantKeys(ctx)
    const contentKeys = deriveContentKeys(ctx)
    const richDocumentKeys = deriveRichDocumentKeys(ctx)
    const base = asPageRowList(live.toArray)
    const filtered =
      filters.length === 0
        ? base
        : base.filter((row) =>
            viewMatches(row, filters, instantKeys, materializedKeys, contentKeys, richDocumentKeys)
          )
    const sorted = [...filtered].sort(makeViewComparator(sorts, ctx))
    return {
      rows: sorted.slice(0, limit),
      totalCount: sorted.length,
      isLoading: false,
      hasMore: false,
      loadMore: noop,
      error: null,
      hydratedCount: sorted.length,
      ensureHydratedUpTo: noop,
    }
  }

  return {
    read,
    subscribe: (cb) => {
      const subBase = live.subscribeChanges(() => cb())
      const subAll = collection.subscribeChanges(() => cb())
      return () => {
        subBase.unsubscribe()
        subAll.unsubscribe()
      }
    },
    dispose: () => {
      live.cleanup()
    },
  }
}
