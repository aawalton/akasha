import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const difficulty = {
  id: "01a17ef0-db9a-7ea2-9739-cfbb6ff70013",
  type: "page-type/played-panel",
  slug: "difficulty",
  definition: "the difficulty level a played story plays at, chosen in place",
  code: "tsx",
  drawn: "js",
  place: "panel-place/journal",
  position: 52,
  createdAt: "2026-10-27T19:57:56.505Z",
  updatedAt: "2026-10-27T19:57:56.505Z",
} as const satisfies PlayedPanel
