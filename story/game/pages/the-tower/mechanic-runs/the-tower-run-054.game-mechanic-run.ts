import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun054 = {
  id: "01a0c958-d6f7-7f2e-aa7b-d5dceef09084",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-054",
  title: "Nap restored most Focus/Stamina + a little HP. Then SUCCESS: bound his own ember…",
  game: "game/the-tower",
  turn: 49,
  mechanic: "game-mechanic/attribute-check",
  said: "Nap restored most Focus/Stamina + a little HP. Then SUCCESS: bound his own ember into the mundane mace -> it is now an EMBER-CONDUIT (holds a heat-charge, channels flame-techniques, rechargeable). Proved the self-supply binding method (distinct from item-to-item transfer). SKILL: Essence Infusion Apprentice 1 -> 3 (within-rung roll-up). NO affinity tick (expenditure). COST (net of nap): Focus +17 (55->72 after a ~28 infusion spend off the nap's recovery), Stamina +18 (42->60), HP +6 (67->73, burns healing); a portion of his held ember went into the bind. STOP at his decision point. NO assumed next action. No reset.",
  follows: "af6c33c7e236763f10b18fde6692dcbf429a1c19fb3c35c33cbe5415685365f7",
  workings: "json",
} as const satisfies GameMechanicRun
