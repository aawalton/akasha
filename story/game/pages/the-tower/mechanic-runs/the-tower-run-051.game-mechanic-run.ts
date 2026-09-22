import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun051 = {
  id: "01a0c958-d69b-7268-9677-ff2238085ad7",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-051",
  title: "RECOVERY (no check). Long safe-camp sleep: Focus 28 -> 110 (full), Stamina 24 ->…",
  game: "game/the-tower",
  turn: 46,
  mechanic: "game-mechanic/attribute-check",
  said: "RECOVERY (no check). Long safe-camp sleep: Focus 28 -> 110 (full), Stamina 24 -> 68 (full), HP 20 -> 70/106 (strong recovery; burns still healing, not full). Cold Revenge returned to the cistern (intact binding, water-fed -> stays charged). Burning Anger placed in the brazier — warms only; binding torn out t45, so no real recharge without active re-infusion (future task). Sleeps unarmed; equipment.weapon stays null. Wakes at camp, recovered, both weapons soaking, the climb still above. STOP at his decision point. NO assumed next action. NO Tower reset.",
  follows: "245387f73ce1b9ce9c49431f76008e74cbb34f2591a4d0d4e6075e1facae48bc",
  workings: "json",
} as const satisfies GameMechanicRun
