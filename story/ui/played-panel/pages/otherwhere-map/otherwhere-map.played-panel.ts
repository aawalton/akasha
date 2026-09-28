import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const otherwhereMap = {
  id: "01a0e839-4373-765e-92d3-8d05da419fac",
  type: "page-type/played-panel",
  slug: "otherwhere-map",
  definition: "the Library's rooms the player has been shown, lit where they have power",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 45,
} as const satisfies PlayedPanel
