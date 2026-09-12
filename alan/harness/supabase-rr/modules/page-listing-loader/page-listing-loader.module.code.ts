import { createServerClient } from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"
import { getPageTypeByPluralSlug } from "akasha/pages/access/page-type/page-type.module.code.ts"
import { data } from "react-router"

export async function pageListingData(request: Request, pluralSlug: string) {
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
