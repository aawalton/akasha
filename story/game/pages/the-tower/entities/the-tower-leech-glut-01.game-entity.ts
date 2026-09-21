import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerLeechGlut01 = {
  id: "01a0c662-cc79-7465-bff6-30cac72809bf",
  type: "page-type/game-entity",
  slug: "the-tower-leech-glut-01",
  title: "The Glut",
  game: "game/the-tower",
  kind: "enemy",
  class: "Leech-swarm",
  level: 2,
  attributes: [
    { attribute: "game-attribute/finesse", score: 14 },
    { attribute: "game-attribute/intellect", score: 2 },
    { attribute: "game-attribute/luck", score: 8 },
    { attribute: "game-attribute/might", score: 5 },
    { attribute: "game-attribute/perception", score: 12 },
    { attribute: "game-attribute/presence", score: 2 },
    { attribute: "game-attribute/vitality", score: 8 },
    { attribute: "game-attribute/will", score: 3 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 0 },
    { name: "weapon", slot: "weapon", attack: 0 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 9,
  typicalIntent: 3,
  note: "computed by engine: VIT8(64)+MIGHT2(10) = 74 HP. Low effective threat IF stranded; lethal IF fought on its terms in the water.",
} as const satisfies GameEntity
