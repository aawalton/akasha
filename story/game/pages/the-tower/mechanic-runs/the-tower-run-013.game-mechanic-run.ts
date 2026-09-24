import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun013 = {
  id: "01a0c958-d192-7842-9c26-ba1b25e1fb1b",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-013",
  title: "VITALITY 6->7 (1 of 3 points spent; 2 unspent). Derived (engine): max Vitae 70->…",
  game: "story-game/the-tower",
  turn: 12,
  mechanic: "game-mechanic/leveling",
  said: "VITALITY 6->7 (1 of 3 points spent; 2 unspent). Derived (engine): max Vitae 70->78 (+8), max Stamina 50->54 (+4), physDef 9.5->10 (+0.5). Current raised with max: Vitae 62->70/78, Stamina 50->54/54. Introspection: Sensitivity trait (high sensory sensitivity) => he FEELS the augmentation as a somatic filling-in; learns diegetically that attribute gains are perceptible in the flesh, not just sheet bookkeeping. No roll (no failure stakes; auto via trait). Ember-burn ache persists (HP still not full per sticky-injury). No System foreshadowing.",
  follows: "e5fe0f99497ff930b23f77293792f31ebf61c94ca08981f64d6ec3c395eaccd1",
  workings: "json",
} as const satisfies GameMechanicRun
