import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const time = {
  id: "01a0e801-8868-7da3-8c75-fe90bcef479b",
  type: "page-type/played-panel",
  slug: "time",
  definition: "the story's in-game time and the appointments still to come",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 30,
} as const satisfies PlayedPanel
