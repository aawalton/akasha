"use client"

import { NotFoundNotice } from "akasha/alan/web-capacitor/modules/not-found-notice/not-found-notice.module.code.tsx"
import { PagesFilteredContent } from "akasha/page/ui/components/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"
import { useParams, useSearchParams } from "react-router"

const PAGE_TYPE_SLUG = "page-type"

export default function CapacitorPageListing() {
  const params = useParams()
  const slugParam = params.pageTypeSlug ?? ""
  const [searchParams] = useSearchParams()

  const { pages: pageTypes, isLoading } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })

  const resolvedSlug = useMemo(() => {
    const match = pageTypes.find((pt) => pt.properties?.slug === slugParam)
    if (match && typeof match.properties?.slug === "string") return match.properties.slug
    return null
  }, [pageTypes, slugParam])

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
  if (resolvedSlug === null) return <NotFoundNotice />

  return (
    <PagesFilteredContent
      pageTypeSlug={toPageTypeSlug(resolvedSlug)}
      searchParams={parsedSearchParams}
    />
  )
}
