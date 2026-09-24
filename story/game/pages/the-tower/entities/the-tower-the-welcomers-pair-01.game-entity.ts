import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheWelcomersPair01 = {
  id: "01a0c662-cdc4-7956-81a7-d1c3d65b2db2",
  type: "page-type/game-entity",
  slug: "the-tower-the-welcomers-pair-01",
  title: "The Welcomers (coordinated pair — run TWO instances of this sheet)",
  game: "game/the-tower",
  kind: "enemy",
  class: "Glamour-predator (pair)",
  dice: "game-mechanic/two-d-ten",
  typicalIntent: 3,
  note: "engine (each): VIT8(64)+MIGHT2(18) = 82 HP. physDef 11. physAtk 30.5. Init 27 each. TWO of them = the floor-5 threat step-up; the danger is the flank + the trust, not a HP wall.",
} as const satisfies GameEntity
