import { getPageTypeBySlug } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { PagesFilteredContent } from "akasha/page/ui/component/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { Suspense } from "react"
import { data } from "react-router"
import type { Route } from "./+types/innworld-page-listing.route.code"

export async function loader({ params, request }: Route.LoaderArgs) {
  const pageType = await getPageTypeBySlug(params.pageTypeSlug)
  if (pageType === null || typeof pageType.slug !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const asked: Record<string, string> = {}
  for (const [key, value] of new URL(request.url).searchParams.entries()) asked[key] = value
  return data({ slug: pageType.slug, searchParams: asked })
}

export default function PagesListingRoute({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense>
      <PagesFilteredContent
        pageTypeSlug={toPageTypeSlug(loaderData.slug)}
        searchParams={loaderData.searchParams}
      />
    </Suspense>
  )
}
