import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerFloor02 = {
  id: "01a0c65d-2146-7632-8bd4-5a195c316b85",
  type: "page-type/game-entity",
  slug: "the-tower-floor-02",
  title: "floor-02",
  game: "game/the-tower",
  kind: "something",
} as const satisfies GameEntity
