import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const towerSheet = {
  id: "01a0de74-5fb3-774d-8268-67fec578bfd8",
  type: "page-type/played-panel",
  slug: "tower-sheet",
  definition: "a Tower character's sheet, with the derived numbers the Tower works",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
} as const satisfies PlayedPanel
