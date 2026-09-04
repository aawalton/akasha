import { isPromotedKey, PROMOTED_COLUMN } from "@akasha/pages-access/routing-core"
import type { PageOrder } from "@akasha/pages-access/types"
import { nullOrderSign } from "@akasha/pages-core/null-ordering"
import { and, type Collection, createLiveQueryCollection } from "@tanstack/db"
import {
  asPageRecord,
  asPageRowList,
  attributesOf,
  type PageRow,
} from "../../collection/page-row/page-row.module.code.ts"
import type { PageConditionLike, UsePagesOptions } from "../../sql/options/options.module.code.ts"
import { conditionMatches } from "../condition-eval/condition-eval.module.code.ts"
import { type BoolExpr, conditionToExpr } from "../condition-expr/condition-expr.module.code.ts"

const DEFAULT_LIMIT = 1000
const ALIAS = "p"

export interface RegularResult {
  readonly rows: readonly PageRow[]
  readonly totalCount: number
  readonly isLoading: boolean
  readonly hasMore: false
  readonly loadMore: () => undefined
  readonly error: Error | null
}

export interface RegularPipeline {
  readonly read: () => RegularResult
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

interface CompiledWhere {
  readonly expr: BoolExpr
  readonly residue: readonly PageConditionLike[]
}

function compileWhere(options: UsePagesOptions): CompiledWhere {
  const combinator: BoolExpr[] = [slugAndDeleted(options)]
  const residue: PageConditionLike[] = []
  for (const cond of options.where ?? []) {
    const expr = conditionToExpr(cond, ALIAS)
    if (expr === null) residue.push(cond)
    else combinator.push(expr)
  }
  return { expr: andAll(combinator), residue }
}

export function slugScopeExpr(pageTypeSlug: string): BoolExpr {
  const base = conditionToExpr({ key: "pageTypeSlug", eq: pageTypeSlug }, ALIAS)
  if (base === null) throw new Error("regular-pipeline: slug predicate failed to lower")
  return base
}

function slugAndDeleted(options: UsePagesOptions): BoolExpr {
  return slugScopeExpr(options.pageTypeSlug)
}

function andAll(exprs: readonly BoolExpr[]): BoolExpr {
  const [first, ...rest] = exprs
  if (first === undefined) throw new Error("regular-pipeline: empty AND")
  return rest.reduce<BoolExpr>((acc, e) => and(acc, e), first)
}

function orderValue(row: PageRow, by: string): unknown {
  if (isPromotedKey(by)) return asPageRecord(row)[PROMOTED_COLUMN[by]] ?? null
  const attrs = attributesOf(row)
  return by in attrs ? attrs[by] : null
}

interface OrderClause {
  readonly by: string
  readonly dir: "asc" | "desc"
}

function orderClauses(order: PageOrder | undefined): readonly OrderClause[] {
  const items = order ?? [{ by: "seq", dir: "asc" as const }]
  const seen = new Set<string>()
  const out: OrderClause[] = []
  for (const o of items) {
    if (seen.has(o.by)) continue
    seen.add(o.by)
    out.push({ by: o.by, dir: o.dir === "desc" ? "desc" : "asc" })
  }
  if (!seen.has("id")) out.push({ by: "id", dir: "asc" })
  return out
}

function compareClause(a: PageRow, b: PageRow, clause: OrderClause): number {
  const va = orderValue(a, clause.by)
  const vb = orderValue(b, clause.by)
  const aNull = va === null || va === undefined
  const bNull = vb === null || vb === undefined
  if (aNull && bNull) return 0
  if (aNull || bNull) return nullOrderSign(aNull, clause.dir === "desc")
  let c: number
  if (typeof va === "number" && typeof vb === "number") c = va < vb ? -1 : va > vb ? 1 : 0
  else {
    const sa = String(va)
    const sb = String(vb)
    c = sa < sb ? -1 : sa > sb ? 1 : 0
  }
  return clause.dir === "asc" ? c : -c
}

function sortRows(rows: readonly PageRow[], order: PageOrder | undefined): readonly PageRow[] {
  const clauses = orderClauses(order)
  return [...rows].sort((a, b) => {
    for (const clause of clauses) {
      const c = compareClause(a, b, clause)
      if (c !== 0) return c
    }
    return 0
  })
}

export function createRegularPipeline(
  collection: Collection<PageRow, string>,
  options: UsePagesOptions
): RegularPipeline {
  const { expr, residue } = compileWhere(options)
  const live = createLiveQueryCollection({
    startSync: true,
    query: (q) =>
      q
        .from({ p: collection })
        .where(() => expr)
        .select(({ p }) => ({ ...p })),
  })

  const read = (): RegularResult => {
    const base = asPageRowList(live.toArray)
    const filtered =
      residue.length === 0
        ? base
        : base.filter((row) => residue.every((cond) => conditionMatches(cond, row)))
    const sorted = sortRows(filtered, options.order)
    const limit = options.limit ?? DEFAULT_LIMIT
    return {
      rows: sorted.slice(0, limit),
      totalCount: sorted.length,
      isLoading: false,
      hasMore: false,
      loadMore: () => undefined,
      error: null,
    }
  }

  return {
    read,
    subscribe: (cb) => {
      const sub = live.subscribeChanges(() => cb())
      return () => {
        sub.unsubscribe()
        return undefined
      }
    },
    dispose: () => {
      live.cleanup()
    },
  }
}
