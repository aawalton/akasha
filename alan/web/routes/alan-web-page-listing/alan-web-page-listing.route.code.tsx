import { pageListingData } from "akasha/alan/harness/supabase-rr/page-listing-loader/page-listing-loader.module.code.ts"
import { PagesFilteredContent } from "akasha/pages/ui/components/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { toPageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { Suspense } from "react"

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string }
  request: Request
}) {
  return pageListingData(request, params.pageTypeSlug)
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
