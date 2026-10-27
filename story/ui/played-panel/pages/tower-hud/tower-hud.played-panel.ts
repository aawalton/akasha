import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const towerHud = {
  id: "01a0c4a0-a9c1-78d6-b56e-0edc72c22103",
  type: "page-type/played-panel",
  slug: "tower-hud",
  definition: "the tower's three pools, read off what the climber has left",
  code: "tsx",
  drawn: "js",
  place: "panel-place/above",
  position: 50,
  createdAt: "2026-09-21T15:40:58.689Z",
  updatedAt: "2026-10-27T18:39:40.072Z",
} as const satisfies PlayedPanel
