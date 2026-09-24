import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const haremHotelDoorward = {
  id: "01a0c662-f977-77e4-9c6a-4a7b0cc397c1",
  type: "page-type/game-entity",
  slug: "harem-hotel-doorward",
  title: "The Doorward",
  game: "story-game/harem-hotel",
  kind: "warden",
  level: 1,
} as const satisfies GameEntity
