import { type Collection, createLiveQueryCollection } from "@tanstack/db"
import {
  asPageRowList,
  type PageRow,
} from "akasha/pages/ui-store/collection/page-row/page-row.module.code.ts"
import { slugScopeExpr } from "akasha/pages/ui-store/query/regular-pipeline/regular-pipeline.module.code.ts"
import { ID_SUFFIX_LENGTH } from "akasha/pages/url/page-href/page-href.module.code.ts"

export interface IdSuffixOptions {
  readonly pageTypeSlug: string
  readonly idSuffix: string
}

export interface IdSuffixResult {
  readonly rows: readonly PageRow[]
}

export interface IdSuffixPipeline {
  readonly read: () => IdSuffixResult
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

export function createIdSuffixPipeline(
  collection: Collection<PageRow, string>,
  options: IdSuffixOptions
): IdSuffixPipeline {
  const expr = slugScopeExpr(options.pageTypeSlug)
  const live = createLiveQueryCollection({
    startSync: true,
    query: (q) =>
      q
        .from({ p: collection })
        .where(() => expr)
        .select(({ p }) => ({ ...p })),
  })

  const read = (): IdSuffixResult => {
    const base = asPageRowList(live.toArray)
    return {
      rows: base.filter((row) => row.id.slice(-ID_SUFFIX_LENGTH) === options.idSuffix),
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
