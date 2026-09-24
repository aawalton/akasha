import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0c662-cd5c-748e-981a-2e17d295637f",
  type: "page-type/game-entity",
  slug: "the-tower-ashling-01",
  title: "Ashling",
  game: "game/the-tower",
  kind: "enemy",
  class: "Ember-thing",
  note: "computed by engine: VIT8+MIGHT2 = 54 HP",
} as const satisfies GameEntity
