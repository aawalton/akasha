import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerFloor01 = {
  id: "01a0c65d-2135-782c-8d77-e7248c95185d",
  type: "page-type/game-entity",
  slug: "the-tower-floor-01",
  title: "floor-01",
  game: "game/the-tower",
  kind: "something",
} as const satisfies GameEntity
