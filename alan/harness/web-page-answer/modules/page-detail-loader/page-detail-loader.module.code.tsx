import {
  getPageByIdSuffix,
  getPageByIdSuffixAcrossTypes,
} from "akasha/page/access/modules/get/get.module.code.ts"
import { getDescendantPageTypeSlugs } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { PageDetailContent } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { data } from "react-router"

const NAV_SLUG = "nav"

const NAV_READ: readonly string[] = [NAV_SLUG]

const NOTHING_READ: readonly string[] = []

export async function pageDetailData(params: { pageTypeSlug: string; pageHrefParam: string }) {
  const { pageTypeSlug, pageHrefParam } = params

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  const brandedSlug = toPageTypeSlug(pageTypeSlug)

  if (pageTypeSlug === NAV_SLUG) {
    const navPage = await getPageByIdSuffix({
      pageTypeSlug: brandedSlug,
      idSuffix: parsed.idSuffix,
      slug: parsed.slug ?? undefined,
      select: ["id", "icon"],
    })
    return data({
      kind: "nav" as const,
      pageTypeSlug,
      pageHrefParam,
      faviconIdSuffix: parsed.idSuffix,
      faviconIcon: navPage && typeof navPage.icon === "string" ? navPage.icon : "",
    })
  }

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

  return data({
    kind: "detail" as const,
    pageTypeSlug: resolvedSlug,
    id,
    faviconIdSuffix: null,
    faviconIcon: "",
  })
}

export type PageDetailLoaderData = Awaited<ReturnType<typeof pageDetailData>>["data"]

export function pageDetailMeta(loaderData: PageDetailLoaderData | undefined) {
  if (loaderData?.faviconIdSuffix == null) return []
  return [
    {
      tagName: "link",
      rel: "icon",
      href: `/api/nav-icon/${loaderData.faviconIdSuffix}?icon=${encodeURIComponent(loaderData.faviconIcon)}`,
      type: "image/svg+xml",
      sizes: "any",
    },
  ]
}

export function PageDetailView({ loaderData }: { loaderData: PageDetailLoaderData }) {
  useLoaderFollowing(loaderData.kind === "nav" ? NAV_READ : NOTHING_READ)
  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }
  const brandedSlug = toPageTypeSlug(loaderData.pageTypeSlug)
  return <PageDetailContent pageTypeSlug={brandedSlug} id={loaderData.id} />
}
