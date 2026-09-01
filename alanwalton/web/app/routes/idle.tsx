import { askComposed } from "@shared/pages-query/ask"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { redirect } from "react-router"
import type { Route } from "./+types/idle"

const IDLE_GAME_SLUG = PageTypeSlug("idle-game")

export async function loader({ request: _request }: Route.LoaderArgs) {
  const asked = await askComposed({
    "page-type": IDLE_GAME_SLUG,
    where: { "game-engine": { is: "idle" } },
    keys: ["id", "slug", "title"],
    limit: 1,
  })
  const game = asked.ok ? asked.answer.rows[0]?.values : undefined
  if (game === undefined || typeof game.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  return redirect(
    buildPageHref({
      pageTypeSlug: IDLE_GAME_SLUG,
      slug: typeof game.slug === "string" ? game.slug : null,
      fallbackSlugSource: typeof game.title === "string" ? game.title : null,
      id: game.id,
    }),
    301
  )
}
