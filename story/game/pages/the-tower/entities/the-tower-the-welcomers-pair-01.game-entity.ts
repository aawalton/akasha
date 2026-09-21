import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheWelcomersPair01 = {
  id: "01a0c661-24a8-74f2-8041-480048a09baf",
  type: "page-type/game-entity",
  slug: "the-tower-the-welcomers-pair-01",
  title: "The Welcomers (coordinated pair — run TWO instances of this sheet)",
  game: "game/the-tower",
  kind: "enemy",
  class: "Glamour-predator (pair)",
  level: 4,
  attributes: [
    { attribute: "game-attribute/finesse", score: 14 },
    { attribute: "game-attribute/intellect", score: 14 },
    { attribute: "game-attribute/luck", score: 8 },
    { attribute: "game-attribute/might", score: 9 },
    { attribute: "game-attribute/perception", score: 13 },
    { attribute: "game-attribute/presence", score: 16 },
    { attribute: "game-attribute/vitality", score: 8 },
    { attribute: "game-attribute/will", score: 13 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 0 },
    { name: "weapon", slot: "weapon", attack: 3 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 14,
  typicalIntent: 3,
  note: "engine (each): VIT8(64)+MIGHT2(18) = 82 HP. physDef 11. physAtk 30.5. Init 27 each. TWO of them = the floor-5 threat step-up; the danger is the flank + the trust, not a HP wall.",
} as const satisfies GameEntity
