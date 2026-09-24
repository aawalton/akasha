import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const theVioletHourAmy = {
  id: "01a0c663-33d3-7f9c-83c7-96dd7bb7d52b",
  type: "page-type/game-entity",
  slug: "the-violet-hour-amy",
  title: "Amy",
  game: "story-game/the-violet-hour",
  kind: "guest",
} as const satisfies GameEntity
