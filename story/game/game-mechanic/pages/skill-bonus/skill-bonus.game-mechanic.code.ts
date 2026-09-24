import type { Bonus } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { placedAt } from "akasha/story/game/game-mechanic/modules/skill-rung/skill-rung.module.code.ts"

const HERE = "story/game/game-mechanic/pages/skill-bonus"

export type Reading = {
  readonly skill: string
  readonly rank: string
}

export type Added = { readonly answered: Bonus } | { readonly refused: string }

export function runMechanic(reading: Reading): Added {
  const placed = placedAt(reading.rank)
  if (placed === undefined) {
    return { refused: `\`${reading.rank}\` is no rung a skill climbs, ${HERE}` }
  }
  return { answered: { from: reading.skill, by: placed.at } }
}
