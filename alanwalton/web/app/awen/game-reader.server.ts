import type { AwenDisplayProps } from "./components/awen-display"
import { loadSessionEnvelope } from "./lib/awen-session.server"
import { loadGame } from "./lib/game.server"

export async function loadAwenGame(externalId: string): Promise<AwenDisplayProps> {
  const game = await loadGame(externalId)
  if (game === null) {
    throw new Response("Not found", { status: 404 })
  }
  return {
    game: {
      externalId: game.externalId,
      title: game.title,
      display: game.display,
    },
    initialEnvelope: await loadSessionEnvelope(game),
  }
}
