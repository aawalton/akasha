import { assertNever } from "@akasha/utils-narrow/assert-never"

export const GAME_ENGINES = ["awen", "idle", "chess"] as const
export type GameEngine = (typeof GAME_ENGINES)[number]

export type GameRenderMode = "awen" | "idle" | "chess" | "generic"

export function isGameEngine(value: string): value is GameEngine {
  return GAME_ENGINES.some((engine) => engine === value)
}

export function selectGameRenderMode(input: {
  readonly gameEngine: string | null | undefined
  readonly externalId: string | null | undefined
}): GameRenderMode {
  const raw = input.gameEngine ?? "awen"
  if (!isGameEngine(raw)) return "generic"
  switch (raw) {
    case "idle":
      return "idle"
    case "chess":
      return "chess"
    case "awen":
      return input.externalId != null && input.externalId !== "" ? "awen" : "generic"
    default:
      return assertNever(raw)
  }
}
