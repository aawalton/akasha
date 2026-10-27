import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const time = {
  id: "01a0e801-8868-7da3-8c75-fe90bcef479b",
  type: "page-type/played-panel",
  slug: "time",
  definition: "the story's in-game time and the appointments still to come",
  code: "tsx",
  drawn: "js",
  place: "panel-place/journal",
  position: 40,
  createdAt: "2026-09-28T12:33:29.704Z",
  updatedAt: "2026-10-27T18:39:15.409Z",
} as const satisfies PlayedPanel
