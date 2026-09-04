import { getPageByIdSuffix } from "@akasha/pages-access/get"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { buildNavIconSvg } from "../alan-nav-icon-svg/alan-nav-icon-svg.module.code.ts"
import type { Route } from "./+types/api.nav-icon.$idSuffix"

const NAV_SLUG = toPageTypeSlug("nav")

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const idSuffix = params.idSuffix

  const { headers } = createServerClient(request)
  const page = await getPageByIdSuffix({
    pageTypeSlug: NAV_SLUG,
    idSuffix,
    select: ["id", "icon"],
  })

  const iconName = page && typeof page.icon === "string" ? page.icon : null
  const svg = await buildNavIconSvg(iconName)

  headers.set("Content-Type", "image/svg+xml; charset=utf-8")
  headers.set("Cache-Control", "private, max-age=300")
  return new Response(svg, { headers })
}
