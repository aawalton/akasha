import { toPageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { getPageTypeByPluralSlug } from "@akasha/pages-access/page-type"
import { PagesFilteredContent } from "@akasha/pages-ui-components/pages-by-relation-content"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { Suspense } from "react"
import { data } from "react-router"

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string }
  request: Request
}) {
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

export default function PagesListingRoute({
  loaderData,
}: {
  loaderData: { slug: string; searchParams: Record<string, string> }
}) {
  const brandedSlug = toPageTypeSlug(loaderData.slug)
  return (
    <Suspense>
      <PagesFilteredContent pageTypeSlug={brandedSlug} searchParams={loaderData.searchParams} />
    </Suspense>
  )
}
