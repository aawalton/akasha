import { getPageByIdSuffix } from "akasha/page/access/modules/get/get.module.code.ts"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { INNWORLD_APP } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-id/innworld-app-id.module.code.ts"
import { data } from "react-router"
import type { Route } from "./+types/innworld-nav-view.route.code"

const NAV = "nav"

const NAV_READ: readonly string[] = [NAV]

export async function loader({ params }: Route.LoaderArgs) {
  const parsed = parsePageHrefParam(params.pageHrefParam)
  if (parsed === null) throw new Response("Not Found", { status: 404 })
  const nav = await getPageByIdSuffix({
    pageTypeSlug: toPageTypeSlug(NAV),
    idSuffix: parsed.idSuffix,
    ...(parsed.slug === null ? {} : { slug: parsed.slug }),
    select: ["id", "app"],
  })
  if (nav === null || nav["app"] !== INNWORLD_APP) {
    throw new Response("Not Found", { status: 404 })
  }
  return data({ pageHrefParam: params.pageHrefParam })
}

export default function NavViewRoute({ loaderData }: Route.ComponentProps) {
  useLoaderFollowing(NAV_READ)
  return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
}
