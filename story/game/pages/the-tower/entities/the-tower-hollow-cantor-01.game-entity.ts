import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerHollowCantor01 = {
  id: "01a0c662-cca7-7432-a842-a15953b1fcc7",
  type: "page-type/game-entity",
  slug: "the-tower-hollow-cantor-01",
  title: "Hollow Cantor",
  game: "game/the-tower",
  kind: "enemy",
  class: "Sound-wraith",
  dice: "game-mechanic/two-d-ten",
  typicalIntent: 6,
  note: "computed by engine: VIT8(56)+MIGHT2(8) = 64 HP, but HP is nearly irrelevant — you win by killing the PLATES, not the wraith. focusMax 72, mentDef 26.5.",
} as const satisfies GameEntity
