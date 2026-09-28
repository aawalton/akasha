import {
  buildNavIconSvg,
  NAV_ICON_ACCENT,
} from "akasha/alan/harness/web-page-answer/modules/nav-icon-svg/nav-icon-svg.module.code.ts"

const ALANWALTON_STROKE_WIDTH = 2.5

const A_DAY = 86_400

export async function loader({ params }: { params: { name: string } }): Promise<Response> {
  const svg = await buildNavIconSvg(params.name, NAV_ICON_ACCENT, ALANWALTON_STROKE_WIDTH)
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": `public, max-age=${A_DAY}`,
    },
  })
}
