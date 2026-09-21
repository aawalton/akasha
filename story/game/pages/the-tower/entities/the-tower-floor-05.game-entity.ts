import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerFloor05 = {
  id: "01a0c65d-219a-7cb3-8cd9-46bc86882d87",
  type: "page-type/game-entity",
  slug: "the-tower-floor-05",
  title: "floor-05",
  game: "game/the-tower",
  kind: "something",
} as const satisfies GameEntity
