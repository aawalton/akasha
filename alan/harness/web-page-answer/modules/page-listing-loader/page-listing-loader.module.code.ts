import { getPageTypeBySlug } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { data } from "react-router"

export async function pageListingData(request: Request, slug: string) {
  const pageType = await getPageTypeBySlug(slug)
  if (!pageType || typeof pageType.slug !== "string") {
    throw new Response("Not Found", { status: 404 })
  }

  const url = new URL(request.url)
  const resolvedSearchParams: Record<string, string> = {}
  for (const [key, value] of url.searchParams.entries()) {
    resolvedSearchParams[key] = value
  }

  return data({ slug: pageType.slug, searchParams: resolvedSearchParams })
}
