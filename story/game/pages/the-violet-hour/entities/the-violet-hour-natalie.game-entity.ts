import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theVioletHourNatalie = {
  id: "01a0c663-33b7-762f-8d8b-c035ecb2e8d5",
  type: "page-type/game-entity",
  slug: "the-violet-hour-natalie",
  title: "Natalie",
  game: "game/the-violet-hour",
  kind: "host",
} as const satisfies GameEntity
