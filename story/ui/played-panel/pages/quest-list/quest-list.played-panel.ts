import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const questList = {
  id: "01a0c4a3-2bf6-71d5-bd9c-5f9b15cc9ae4",
  type: "page-type/played-panel",
  slug: "quest-list",
  definition: "what a character has taken on and how far along each one is",
  code: "tsx",
  drawn: "js",
  place: "panel-place/journal",
  position: 60,
  createdAt: "2026-09-21T15:43:43.094Z",
  updatedAt: "2026-10-27T18:39:15.409Z",
} as const satisfies PlayedPanel
