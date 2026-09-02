import { selectGameRenderMode } from "@akasha/story-engine-core/game-engine"

export type PageDisplayKind = "idle" | "chess" | "chess-review" | "persona" | "generic"

export function selectPageDisplayKind(input: {
  readonly configDisplay: string | null | undefined
  readonly gameEngine: string | null | undefined
  readonly externalId: string | null | undefined
}): PageDisplayKind {
  const display = input.configDisplay ?? undefined
  if (display == null) return "generic"
  if (display === "game") {
    const mode = selectGameRenderMode({
      gameEngine: input.gameEngine,
      externalId: input.externalId,
    })
    return mode === "awen" ? "generic" : mode
  }
  if (display === "chess-review") return "chess-review"
  if (display === "persona") return "persona"
  if (display === "idle") return "idle"
  if (display === "chess") return "chess"
  return "generic"
}
