"use client"

import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { pageName } from "akasha/page/core/modules/page-name/page-name.module.code.ts"
import {
  type PageTypeForInheritance,
  pageTypeChain,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { title } from "akasha/page/properties/title.text-property.ts"
import {
  askComposed,
  type ComposedQuery,
  type QueryRow,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { useCallback, useEffect, useState } from "react"

export const PICKED_AT_ONCE = 50

const TITLE = title.propertySlug

const SLUG = "slug"

const ID = "id"

export const TITLE_PROPERTY = `${slugIn(title.type)}/${title.slug}`

const CONTAINS_IGNORING_CASE = "contains-ignoring-case"

type PickedPage = { readonly id: string; readonly title: string }

type Picked = { readonly pages: readonly PickedPage[]; readonly more: boolean }

type Answered = { readonly rows: readonly QueryRow[]; readonly n: number }

interface RelationPickerArgs {
  pageTypeSlug: string
  titled: boolean
  searchTerm?: string
  enabled?: boolean
}

interface RelationPickerResult {
  pages: readonly PickedPage[]
  loadMore: () => void
  canLoadMore: boolean
  isLoading: boolean
}

const NOTHING_PICKED: Picked = { pages: [], more: false }

export function pickedSlugFor(
  slugById: ReadonlyMap<string, string>,
  targetPageTypeId: string | undefined,
  fallback: string
): string {
  if (targetPageTypeId === undefined) return fallback
  return slugById.get(targetPageTypeId) ?? fallback
}

export function targetIdFor(
  slugById: ReadonlyMap<string, string>,
  targetPageTypeId: string | undefined,
  targetPageTypeSlug: string | undefined
): string | undefined {
  if (targetPageTypeId !== undefined || targetPageTypeSlug === undefined) return targetPageTypeId
  for (const [id, slug] of slugById) if (slug === targetPageTypeSlug) return id
  return undefined
}

function declaresTitle(pageType: PageTypeForInheritance | undefined): boolean {
  const declared = pageType?.properties?.properties
  if (!Array.isArray(declared)) return false
  return declared.some(
    (one: unknown) =>
      typeof one === "object" &&
      one !== null &&
      (one as { pageProperty?: unknown }).pageProperty === TITLE_PROPERTY
  )
}

export function titledFor(
  pageTypes: readonly PageTypeForInheritance[],
  pageTypeSlug: string,
  below: ReadonlySet<string>
): boolean {
  const bySlug = new Map<string, PageTypeForInheritance>()
  for (const one of pageTypes) {
    const own = one.properties?.slug
    if (typeof own === "string") bySlug.set(own, one)
  }
  if (pageTypeChain(pageTypes, pageTypeSlug).some((one) => declaresTitle(bySlug.get(one)))) {
    return true
  }
  return pageTypes.some((one) => below.has(one._id) && declaresTitle(one))
}

export function pickerQueries(
  pageTypeSlug: string,
  titled: boolean,
  searchTerm: string,
  limit: number
): readonly ComposedQuery[] {
  const keys = titled ? [ID, SLUG, TITLE] : [ID, SLUG]
  const asked: ComposedQuery = { "page-type": pageTypeSlug, keys, "sort-by": SLUG, limit }
  if (searchTerm === "") return [asked]
  const named = titled ? [TITLE, SLUG] : [SLUG]
  return named.map((key) => ({
    ...asked,
    where: { [key]: { [CONTAINS_IGNORING_CASE]: searchTerm } },
  }))
}

export function pickedFrom(answers: readonly Answered[]): Picked {
  const seen = new Set<string>()
  const pages: PickedPage[] = []
  let more = false
  for (const answer of answers) {
    if (answer.n > answer.rows.length) more = true
    for (const row of answer.rows) {
      const id = textIn(row.values[ID])
      if (id === null || seen.has(id)) continue
      seen.add(id)
      pages.push({ id, title: pageName(row.values) })
    }
  }
  return { pages, more }
}

async function picking(queries: readonly ComposedQuery[]): Promise<Picked> {
  const asked = await Promise.all(queries.map((one) => askComposed(one)))
  const answers: Answered[] = []
  for (const one of asked) {
    if (one.ok) answers.push(one.answer)
    else console.error("[relation-picker] a search went unanswered", one.why)
  }
  return pickedFrom(answers)
}

export function usePaginatedRelationPicker(args: RelationPickerArgs): RelationPickerResult {
  const { pageTypeSlug, titled, searchTerm = "", enabled = true } = args
  const isActive = enabled && pageTypeSlug !== ""
  const searched = JSON.stringify([pageTypeSlug, titled, searchTerm])
  const [grown, setGrown] = useState({ searched, limit: PICKED_AT_ONCE })
  const limit = grown.searched === searched ? grown.limit : PICKED_AT_ONCE
  const asking = `${searched}${limit}`
  const [held, setHeld] = useState<{ asking: string; picked: Picked } | null>(null)

  useEffect(() => {
    if (!isActive) return
    let cancelled = false
    void picking(pickerQueries(pageTypeSlug, titled, searchTerm, limit)).then((picked) => {
      if (!cancelled) setHeld({ asking, picked })
    })
    return () => {
      cancelled = true
    }
  }, [isActive, asking, pageTypeSlug, titled, searchTerm, limit])

  const loadMore = useCallback(() => {
    setGrown({ searched, limit: limit + PICKED_AT_ONCE })
  }, [searched, limit])

  const answered = held?.asking === asking ? held.picked : null
  const shown = answered ?? held?.picked ?? NOTHING_PICKED
  return {
    pages: isActive ? shown.pages : [],
    loadMore,
    canLoadMore: isActive && answered?.more === true,
    isLoading: isActive && answered === null,
  }
}
