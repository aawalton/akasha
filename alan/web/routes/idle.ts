import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { unheld } from "../pages-unheld/pages-unheld.module.code.ts"
import type { Route } from "./+types/idle"

const IDLE_GAME_SLUG = toPageTypeSlug("idle-game")

// THIS REDIRECT CANNOT BE BUILT, AND A 404 WOULD SAY THE WRONG THING. `/idle` is a permanent
// redirect onto whichever `idle-game` page carries the idle engine, so it has to read that page's
// id and slug to know where it is sending anyone. `idle-game` is no page type the pages system
// service holds, so there is nothing to read.
//
// The 404 this threw wherever the query matched nothing is not reused. A 301 route answering 404
// tells a browser — and a search engine, and `idle.alanwalton.com`, which `server.ts` redirects
// here — that the idle game is gone for good. 503 says what is true: it is unreachable from here.
export async function loader({ request: _request }: Route.LoaderArgs): Promise<Response> {
  return new Response(unheld(IDLE_GAME_SLUG, "the game this redirect points at"), { status: 503 })
}
