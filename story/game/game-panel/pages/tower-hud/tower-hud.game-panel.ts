import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const towerHud = {
  id: "01a0c4a0-a9c1-78d6-b56e-0edc72c22103",
  type: "page-type/game-panel",
  slug: "tower-hud",
  definition: "the tower's three pools, read off what the climber has left",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies GamePanel
