import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const questList = {
  id: "01a0c4a3-2bf6-71d5-bd9c-5f9b15cc9ae4",
  type: "page-type/game-panel",
  slug: "quest-list",
  definition: "what a character has taken on and how far along each one is",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies GamePanel
