"use client"

import type { Collection } from "@tanstack/db"
import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type {
  ViewDataJSON,
  ViewFilter,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  type DefinitionsOf,
  type RelatedFilter,
  readViewFilters,
  relatedFilterOf,
} from "akasha/page/core/view/modules/read-view-filters/read-view-filters.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  useAcquireSlugs,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  asPageRowList,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { useMemo } from "react"

export type ReadViewConfig = {
  readonly viewConfig: ViewDataJSON | undefined
  readonly ownFilters: readonly ViewFilter[] | undefined
  readonly pending: boolean
  readonly error: Error | null
}

type RowsOf = {
  readonly rows: readonly Page[]
  readonly ready: boolean
  readonly error: Error | null
}

type KindsBelow = (pageTypeSlug: string) => ReadonlySet<string>

const NO_RELATED: readonly RelatedFilter[] = []

const NO_ROWS: readonly Page[] = []

const PARTED = "\0"

function rowsOfPipeline(collection: Collection<PageRow, string>, slugs: ReadonlySet<string>) {
  return {
    read: (): readonly Page[] =>
      asPageRowList(collection.toArray)
        .filter((row) => slugs.has(row.page_type_slug))
        .map((row) => flattenRow(row)),
    subscribe: (cb: () => undefined): (() => undefined) => {
      const held = collection.subscribeChanges(() => cb())
      return () => {
        held.unsubscribe()
      }
    },
    dispose: (): undefined => undefined,
  }
}

function useRowsOf(slugs: readonly string[], kinds: readonly string[]): RowsOf {
  const key = [...new Set(kinds)].sort().join(PARTED)
  const acquired = useAcquireSlugs(slugs)
  const { snapshot, error } = usePipelineLive<readonly Page[]>(
    (collection) => rowsOfPipeline(collection, new Set(key.split(PARTED))),
    key,
    key !== "" && acquired.ready
  )
  const failed = acquired.error ?? error
  const ready = key === "" || (acquired.ready && snapshot !== null)
  return useMemo(
    () => ({ rows: snapshot ?? NO_ROWS, ready, error: failed }),
    [snapshot, ready, failed]
  )
}

function definitionsBySlug(pageTypes: readonly PageWithProperties[]): DefinitionsOf {
  const held = new Map<string, readonly PropertyDefinition[]>()
  for (const one of pageTypes) {
    const slug = one.properties.slug
    if (typeof slug !== "string" || slug === "") continue
    held.set(slug, parsePageTypeData(one.properties).propertyDefinitions)
  }
  return (slug) => held.get(slug)
}

function parentsOf(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return []
  const parents: string[] = []
  for (const one of held) {
    const slug = typeof one === "string" ? slugIn(one) : null
    if (slug !== null) parents.push(slug)
  }
  return parents
}

function kindsBelowOf(pageTypes: readonly PageWithProperties[]): KindsBelow {
  const extended = new Map<string, readonly string[]>()
  for (const one of pageTypes) {
    const slug = one.properties.slug
    if (typeof slug === "string" && slug !== "")
      extended.set(slug, parentsOf(one.properties.extends))
  }
  return (slug) => {
    const kinds = new Set([slug])
    let grew = true
    while (grew) {
      grew = false
      for (const [kind, parents] of extended) {
        if (kinds.has(kind) || !parents.some((one) => kinds.has(one))) continue
        kinds.add(kind)
        grew = true
      }
    }
    return kinds
  }
}

export function useReadViewConfig(
  viewConfig: ViewDataJSON | undefined,
  definitions: readonly PropertyDefinition[],
  pageTypes: readonly PageWithProperties[]
): ReadViewConfig {
  const definitionsOf = useMemo(() => definitionsBySlug(pageTypes), [pageTypes])
  const read = useMemo(
    () => readViewFilters(viewConfig?.filters ?? [], definitions, definitionsOf),
    [viewConfig?.filters, definitions, definitionsOf]
  )
  const related = "own" in read ? read.related : NO_RELATED
  const kindsBelow = useMemo(() => kindsBelowOf(pageTypes), [pageTypes])
  const slugs = useMemo(() => related.map((one) => one.pageTypeSlug), [related])
  const kindsOf = useMemo(
    () => new Map(slugs.map((slug) => [slug, kindsBelow(slug)] as const)),
    [slugs, kindsBelow]
  )
  const kinds = useMemo(() => [...kindsOf.values()].flatMap((one) => [...one]), [kindsOf])
  const targets = useRowsOf(slugs, kinds)

  return useMemo((): ReadViewConfig => {
    if ("refused" in read) {
      return {
        viewConfig: undefined,
        ownFilters: undefined,
        pending: false,
        error: new Error(`a narrow this view cannot read is refused: ${read.refused}`),
      }
    }
    if ("unread" in read) {
      return { viewConfig: undefined, ownFilters: undefined, pending: true, error: null }
    }
    if (targets.error !== null) {
      return { viewConfig: undefined, ownFilters: read.own, pending: false, error: targets.error }
    }
    if (!targets.ready) {
      return { viewConfig: undefined, ownFilters: read.own, pending: true, error: null }
    }
    const filters = [
      ...read.own,
      ...read.related.map((one) =>
        relatedFilterOf(one, targets.rows, kindsOf.get(one.pageTypeSlug) ?? new Set())
      ),
    ]
    return {
      viewConfig:
        viewConfig === undefined
          ? undefined
          : { ...viewConfig, filters: filters.length > 0 ? filters : undefined },
      ownFilters: read.own,
      pending: false,
      error: null,
    }
  }, [read, targets, viewConfig, kindsOf])
}
