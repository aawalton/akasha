import { getPageByIdSuffix, getPageByIdSuffixAcrossTypes } from "@shared/pages-access/get"
import { getDescendantPageTypeSlugs } from "@shared/pages-access/page-type"
import { PageDetailContent } from "@shared/pages-ui/components/page-detail-content"
import { ViewPageContent } from "@shared/pages-ui/components/view-page-content"
import { PageTypeSlug, parsePageHrefParam } from "@shared/pages-url"
import { createServerClient } from "@shared/supabase-rr/server"
import { data } from "react-router"
import type { Route } from "./+types/page-detail"

const NAV_SLUG = "nav"

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (loaderData?.faviconIdSuffix == null) return []
  return [
    {
      tagName: "link",
      rel: "icon",
      href: `/api/nav-icon/${loaderData.faviconIdSuffix}`,
      type: "image/svg+xml",
      sizes: "any",
    },
  ]
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { pageTypeSlug, pageHrefParam } = params

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  if (pageTypeSlug === NAV_SLUG) {
    return data(
      {
        kind: "nav" as const,
        pageTypeSlug,
        pageHrefParam,
        faviconIdSuffix: parsed.idSuffix,
      },
      { headers: new Headers() }
    )
  }

  const brandedSlug = PageTypeSlug(pageTypeSlug)
  const { headers } = createServerClient(request)

  const exact = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id"],
  })

  let resolvedSlug = pageTypeSlug
  let id: string | null = exact && typeof exact.id === "string" ? exact.id : null

  if (id == null) {
    const subtree = await getDescendantPageTypeSlugs(brandedSlug)
    if (subtree.length > 1) {
      const resolved = await getPageByIdSuffixAcrossTypes({
        pageTypeSlugs: subtree,
        idSuffix: parsed.idSuffix,
        slug: parsed.slug ?? undefined,
      })
      if (resolved && typeof resolved.id === "string") {
        id = resolved.id
        if (typeof resolved.pageTypeSlug === "string") resolvedSlug = resolved.pageTypeSlug
      }
    }
  }

  if (id == null) {
    throw new Response("Not Found", { status: 404 })
  }

  return data(
    {
      kind: "detail" as const,
      pageTypeSlug: resolvedSlug,
      id,
      faviconIdSuffix: null,
    },
    { headers }
  )
}

export default function PageDetailRoute({ loaderData }: Route.ComponentProps) {
  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }
  const brandedSlug = PageTypeSlug(loaderData.pageTypeSlug)
  return <PageDetailContent pageTypeSlug={brandedSlug} id={loaderData.id} />
}
