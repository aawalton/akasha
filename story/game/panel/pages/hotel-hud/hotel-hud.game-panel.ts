import type { GamePanel } from "akasha/story/game/panel/game-panel.page-type.types.ts"

export const hotelHud = {
  id: "01a0c4a1-417a-7278-9812-2e0abc2f93cf",
  type: "page-type/game-panel",
  slug: "hotel-hud",
  definition: "the hotel's three pools, read off what the climber has left",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies GamePanel
