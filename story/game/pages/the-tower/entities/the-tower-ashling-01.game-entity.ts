import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0c65d-1f91-76f7-a989-16c6073ab49a",
  type: "page-type/game-entity",
  slug: "the-tower-ashling-01",
  title: "Ashling",
  game: "game/the-tower",
  kind: "enemy",
  class: "Ember-thing",
  level: 1,
  attributes: [
    { attribute: "game-attribute/finesse", score: 8 },
    { attribute: "game-attribute/intellect", score: 3 },
    { attribute: "game-attribute/luck", score: 5 },
    { attribute: "game-attribute/might", score: 7 },
    { attribute: "game-attribute/perception", score: 7 },
    { attribute: "game-attribute/presence", score: 3 },
    { attribute: "game-attribute/vitality", score: 5 },
    { attribute: "game-attribute/will", score: 4 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 0 },
    { name: "weapon", slot: "weapon", attack: 0 },
  ],
} as const satisfies GameEntity
