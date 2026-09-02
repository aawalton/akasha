import { type GameState, GameStateSchema } from "@akasha/story-engine-core/state-schema"

export interface AwenStatePageFields {
  readonly turn: unknown
  readonly hud: unknown
  readonly revealed: unknown
  readonly build: unknown
  readonly log: unknown
  readonly chapters: unknown
  readonly quests: unknown
}

export function parseAwenStatePage(fields: AwenStatePageFields): GameState {
  return GameStateSchema.parse({
    turn: fields.turn,
    hud: fields.hud ?? undefined,
    revealed: fields.revealed ?? undefined,
    build: fields.build ?? undefined,
    log: fields.log ?? undefined,
    chapters: fields.chapters ?? undefined,
    quests: fields.quests ?? undefined,
  })
}
