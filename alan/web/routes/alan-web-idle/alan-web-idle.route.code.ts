import { unheld } from "akasha/alan/web/modules/pages-unheld/pages-unheld.module.code.ts"
import { toPageTypeSlug } from "akasha/pages/url/modules/page-type-slug/page-type-slug.module.code.ts"

const IDLE_GAME_SLUG = toPageTypeSlug("idle-game")

export async function loader({ request: _request }: { request: Request }): Promise<Response> {
  return new Response(unheld(IDLE_GAME_SLUG, "the game this redirect points at"), { status: 503 })
}
