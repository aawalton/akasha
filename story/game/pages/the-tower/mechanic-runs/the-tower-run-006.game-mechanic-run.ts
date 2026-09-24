import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun006 = {
  id: "01a0c958-d082-77ee-a7e0-1dd4bda5f72f",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-006",
  title: "ROUGH SUCCESS w/ backlash. Affinities axis UNLOCKED by deed. Gained Ember Affini…",
  game: "story-game/the-tower",
  turn: 6,
  mechanic: "game-mechanic/attribute-check",
  said: "ROUGH SUCCESS w/ backlash. Affinities axis UNLOCKED by deed. Gained Ember Affinity I (faint). Forced raw draw untrained → backlash: -12 HP (70→58, ember burn) and -30 Focus (104→74). Cinder CONSUMED (drawn cold/inert, removed from inventory; most essence wasted by the clumsy draw). Mechanic now pre-decided in mechanics/essence.md. Not a fumble (roll 4, not nat-1) — marginal success, real cost.",
  seed: "1538300928",
  follows: "580ecf69e0230338590b187340efc7a1fb104af5f9607882473c55539040fbe5",
  workings: "json",
} as const satisfies GameMechanicRun
