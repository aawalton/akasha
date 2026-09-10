import { parsePageHrefParam } from "@akasha/pages/url/page-href"
import { toPageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { getPageByIdSuffix, getPageByIdSuffixAcrossTypes } from "@akasha/pages-access/get"
import { getDescendantPageTypeSlugs } from "@akasha/pages-access/page-type"
import { PageDetailContent } from "@akasha/pages-ui-components/page-detail-content"
import { ViewPageContent } from "@akasha/pages-ui-components/view-page-content"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { data } from "react-router"

const NAV_SLUG = "nav"

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string; pageHrefParam: string }
  request: Request
}) {
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

  const brandedSlug = toPageTypeSlug(pageTypeSlug)
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

type PageDetailLoaderData = Awaited<ReturnType<typeof loader>>["data"]

export function meta({ data: loaderData }: { data: PageDetailLoaderData | undefined }) {
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

export default function PageDetailRoute({ loaderData }: { loaderData: PageDetailLoaderData }) {
  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }
  const brandedSlug = toPageTypeSlug(loaderData.pageTypeSlug)
  return <PageDetailContent pageTypeSlug={brandedSlug} id={loaderData.id} />
}
