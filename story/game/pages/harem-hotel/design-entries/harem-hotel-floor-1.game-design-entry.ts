import type { GameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.types.ts"

export const haremHotelFloor1 = {
  id: "01a0c946-5ada-7ca8-bdf8-de98e5be5d4b",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-floor-1",
  title: "Floor 1",
  game: "game/harem-hotel",
  kind: "floor-design",
  note: "md",
} as const satisfies GameDesignEntry
