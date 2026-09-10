import { toPageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { getPageByIdSuffix } from "@akasha/pages-access/get"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import {
  buildNavIconSvg,
  NAV_ICON_ACCENT,
} from "akasha/alan/harness/web-page-answers/nav-icon-svg/nav-icon-svg.module.code.ts"

const NAV_SLUG = toPageTypeSlug("nav")

const ARCHIVE_OF_WORLDS_STROKE_WIDTH = 2.5

export async function loader({
  params,
  request,
}: {
  params: { idSuffix: string }
  request: Request
}): Promise<Response> {
  const idSuffix = params.idSuffix

  const { headers } = createServerClient(request)
  const page = await getPageByIdSuffix({
    pageTypeSlug: NAV_SLUG,
    idSuffix,
    select: ["id", "icon"],
  })

  const iconName = page && typeof page.icon === "string" ? page.icon : null
  const svg = await buildNavIconSvg(iconName, NAV_ICON_ACCENT, ARCHIVE_OF_WORLDS_STROKE_WIDTH)

  headers.set("Content-Type", "image/svg+xml; charset=utf-8")
  headers.set("Cache-Control", "private, max-age=300")
  return new Response(svg, { headers })
}
