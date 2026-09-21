import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theVioletHourZadi = {
  id: "01a0c663-336a-7abe-8864-fd3a7dc96b1d",
  type: "page-type/game-entity",
  slug: "the-violet-hour-zadi",
  title: "Zadi",
  game: "game/the-violet-hour",
  kind: "guest",
} as const satisfies GameEntity
