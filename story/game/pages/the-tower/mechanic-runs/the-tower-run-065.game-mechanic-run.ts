import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun065 = {
  id: "01a0c958-d883-7876-bcf0-a87813b620b2",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-065",
  title: "FORAGE good (margin 16). Pyre lit; rope consumed; a modest Armful of fuel set as…",
  game: "game/the-tower",
  turn: 60,
  mechanic: "game-mechanic/attribute-check",
  said: "FORAGE good (margin 16). Pyre lit; rope consumed; a modest Armful of fuel set aside as leftover stock. All three ember items now RECHARGING in the flame (Furnace-heart + rivet refilling from empty; Burning Anger climbing from LOW — it catches now that it's bound). COST: Stamina 65->56, Focus 42->36; HP flat. No XP/skill/affinity tick. The forge is alive again; 3 attribute points still UNSPENT; his specific craft not yet named. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "9e76092e43f50249bf54a7a862ca8ebdad1e160f397282ce759c707953dd69dd",
  workings: "json",
} as const satisfies GameMechanicRun
