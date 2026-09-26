import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const hotelSheet = {
  id: "01a0de74-5fb2-7ae0-8ceb-27e3a84e85c9",
  type: "page-type/game-panel",
  slug: "hotel-sheet",
  definition: "a Harem Hotel character's sheet, with the derived numbers the hotel works",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies GamePanel
