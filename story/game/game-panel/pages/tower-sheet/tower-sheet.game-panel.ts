import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const towerSheet = {
  id: "01a0de74-5fb3-774d-8268-67fec578bfd8",
  type: "page-type/game-panel",
  slug: "tower-sheet",
  definition: "a Tower character's sheet, with the derived numbers the Tower works",
  code: "tsx",
  place: "panel-place/aside",
} as const satisfies GamePanel
