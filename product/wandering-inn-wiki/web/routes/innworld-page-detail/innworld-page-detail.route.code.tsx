import { getPageByIdSuffix } from "akasha/page/access/modules/get/get.module.code.ts"
import { PageDetailContent } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { data } from "react-router"
import type { Route } from "./+types/innworld-page-detail.route.code"

export async function loader({ params }: Route.LoaderArgs) {
  const parsed = parsePageHrefParam(params.pageHrefParam)
  if (parsed === null) throw new Response("Not Found", { status: 404 })
  const page = await getPageByIdSuffix({
    pageTypeSlug: toPageTypeSlug(params.pageTypeSlug),
    idSuffix: parsed.idSuffix,
    ...(parsed.slug === null ? {} : { slug: parsed.slug }),
    select: ["id", "title"],
  })
  if (page === null || typeof page.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const title = typeof page["title"] === "string" ? page["title"] : null
  return data({ pageTypeSlug: params.pageTypeSlug, id: page.id, title })
}

export function meta({ data: loaderData }: Route.MetaArgs) {
  const title = loaderData?.title
  return [{ title: title == null || title === "" ? "Innworld" : `${title} — Innworld` }]
}

export default function PageDetailRoute({ loaderData }: Route.ComponentProps) {
  return (
    <PageDetailContent pageTypeSlug={toPageTypeSlug(loaderData.pageTypeSlug)} id={loaderData.id} />
  )
}
