import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const otherwhereSheet = {
  id: "01a0e805-b287-74c3-b0c4-f8db3327ac52",
  type: "page-type/played-panel",
  slug: "otherwhere-sheet",
  definition: "an Otherwhere character's sheet, which shows no stats",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 53,
} as const satisfies PlayedPanel
