import { and, type Collection, createLiveQueryCollection, or } from "@tanstack/db"
import {
  asPageRowList,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import {
  type BoolExpr,
  conditionToExpr,
} from "akasha/page/ui-store/query/modules/condition-expr/condition-expr.module.code.ts"

const ALIAS = "p"

export type RelatedNaming = {
  readonly pageTypeSlug: string
  readonly by: "id" | "slug"
  readonly values: readonly string[]
}

interface RelatedPipeline {
  readonly read: () => readonly PageRow[]
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

function namingExpr(naming: RelatedNaming): BoolExpr {
  const typed = conditionToExpr({ key: "pageTypeSlug", eq: naming.pageTypeSlug }, ALIAS)
  const named = conditionToExpr({ key: naming.by, in: [...naming.values] }, ALIAS)
  if (typed === null || named === null) {
    throw new Error("related-pipeline: a naming's predicate failed to lower")
  }
  return and(typed, named)
}

function anyOf(exprs: readonly BoolExpr[]): BoolExpr {
  const [first, ...rest] = exprs
  if (first === undefined) throw new Error("related-pipeline: nothing is named")
  return rest.reduce<BoolExpr>((held, one) => or(held, one), first)
}

export function createRelatedPipeline(
  collection: Collection<PageRow, string>,
  namings: readonly RelatedNaming[]
): RelatedPipeline {
  const expr = anyOf(namings.map(namingExpr))
  const live = createLiveQueryCollection({
    startSync: true,
    query: (q) =>
      q
        .from({ p: collection })
        .where(() => expr)
        .select(({ p }) => ({ ...p })),
  })
  return {
    read: () => asPageRowList(live.toArray),
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
