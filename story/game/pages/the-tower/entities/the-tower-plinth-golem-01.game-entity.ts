import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0c662-ccd4-7950-a9c6-1f8c34a163ec",
  type: "page-type/game-entity",
  slug: "the-tower-plinth-golem-01",
  title: "Plinth Golem (the Warden)",
  game: "game/the-tower",
  kind: "enemy",
  class: "Stone Warden",
  level: 3,
  attributes: [
    { attribute: "game-attribute/finesse", score: 5 },
    { attribute: "game-attribute/intellect", score: 6 },
    { attribute: "game-attribute/luck", score: 4 },
    { attribute: "game-attribute/might", score: 15 },
    { attribute: "game-attribute/perception", score: 7 },
    { attribute: "game-attribute/presence", score: 5 },
    { attribute: "game-attribute/vitality", score: 14 },
    { attribute: "game-attribute/will", score: 10 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 5 },
    { name: "weapon", slot: "weapon", attack: 6 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 20,
  typicalIntent: 3,
  note: "computed by engine: VIT8(112)+MIGHT2(30) = 142 HP. physDef (14+5)/2+5 = 14.5. physAtk 33.5. The HP is a wall unless you hit the keystone.",
} as const satisfies GameEntity
