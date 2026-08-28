import { getPageTypeByPluralSlug } from "@shared/pages-access/page-type"
import { PagesFilteredContent } from "@shared/pages-ui/components/pages-by-relation-content"
import { PageTypeSlug } from "@shared/pages-url"
import { createServerClient } from "@shared/supabase-rr/server"
import { Suspense } from "react"
import { data } from "react-router"
import type { Route } from "./+types/page-listing"

export async function loader({ params, request }: Route.LoaderArgs) {
  const pluralSlug = params.pageTypeSlug

  const { headers } = createServerClient(request)
  const pageType = await getPageTypeByPluralSlug(pluralSlug)
  if (!pageType || typeof pageType.slug !== "string") {
    throw new Response("Not Found", { status: 404 })
  }

  const url = new URL(request.url)
  const resolvedSearchParams: Record<string, string> = {}
  for (const [key, value] of url.searchParams.entries()) {
    resolvedSearchParams[key] = value
  }

  return data({ slug: pageType.slug, searchParams: resolvedSearchParams }, { headers })
}

export default function PagesListingRoute({ loaderData }: Route.ComponentProps) {
  const brandedSlug = PageTypeSlug(loaderData.slug)
  return (
    <Suspense>
      <PagesFilteredContent pageTypeSlug={brandedSlug} searchParams={loaderData.searchParams} />
    </Suspense>
  )
}
