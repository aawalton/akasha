import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerFloor03 = {
  id: "01a0c65d-2164-71a4-b304-6d3c8fab958d",
  type: "page-type/game-entity",
  slug: "the-tower-floor-03",
  title: "floor-03",
  game: "game/the-tower",
  kind: "something",
} as const satisfies GameEntity
