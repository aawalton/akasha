"use client"

import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { PagesFilteredContent } from "@akasha/pages-ui-components/pages-by-relation-content"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useMemo } from "react"
import { useParams, useSearchParams } from "react-router"

const PAGE_TYPE_SLUG = "page-type"

export default function CapacitorPageListing() {
  const params = useParams()
  const pluralParam = params.pageTypeSlug ?? ""
  const [searchParams] = useSearchParams()

  const { pages: pageTypes, isLoading } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })

  const resolvedSlug = useMemo(() => {
    const byPlural = pageTypes.find((pt) => pt.properties?.pluralSlug === pluralParam)
    if (byPlural && typeof byPlural.properties?.slug === "string") return byPlural.properties.slug
    const byBareSlug = pageTypes.find(
      (pt) => pt.properties?.pluralSlug == null && pt.properties?.slug === pluralParam
    )
    if (byBareSlug && typeof byBareSlug.properties?.slug === "string") {
      return byBareSlug.properties.slug
    }
    return null
  }, [pageTypes, pluralParam])

  const parsedSearchParams = useMemo(() => {
    const record: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) record[key] = value
    return record
  }, [searchParams])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl p-6 text-primary">
        <p className="text-secondary">Loading…</p>
      </main>
    )
  }
  if (resolvedSlug === null) return <NotFound />

  return (
    <PagesFilteredContent
      pageTypeSlug={toPageTypeSlug(resolvedSlug)}
      searchParams={parsedSearchParams}
    />
  )
}

function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6 text-primary">
      <h1 className="font-semibold text-lg">Not found</h1>
      <p className="text-secondary">This page couldn’t be found.</p>
    </main>
  )
}
