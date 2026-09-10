import { toPageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { unheld } from "../../pages-unheld/pages-unheld.module.code.ts"

const IDLE_GAME_SLUG = toPageTypeSlug("idle-game")

export async function loader({ request: _request }: { request: Request }): Promise<Response> {
  return new Response(unheld(IDLE_GAME_SLUG, "the game this redirect points at"), { status: 503 })
}
