import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const hotelSheet = {
  id: "01a0de74-5fb2-7ae0-8ceb-27e3a84e85c9",
  type: "page-type/played-panel",
  slug: "hotel-sheet",
  definition: "a Harem Hotel character's sheet, with the derived numbers the hotel works",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 51,
} as const satisfies PlayedPanel
