import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const aravelHud = {
  id: "01a0c4a4-5834-7907-82c5-543383c1b0ba",
  type: "page-type/game-panel",
  slug: "aravel-hud",
  definition: "Aravel's three pools, read off what the traveller has left",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies GamePanel
