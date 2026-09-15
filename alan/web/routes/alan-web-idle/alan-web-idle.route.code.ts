import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { idle } from "akasha/product/game/idle-game/pages/idle.idle-game.ts"

const IDLE_GAME_HREF = buildPageHref({
  pageTypeSlug: toPageTypeSlug(idle.type),
  slug: idle.slug,
  fallbackSlugSource: null,
  id: idle.id,
})

export async function loader({ request: _request }: { request: Request }): Promise<Response> {
  return new Response(null, { status: 301, headers: { Location: IDLE_GAME_HREF } })
}
