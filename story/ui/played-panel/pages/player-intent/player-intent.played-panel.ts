import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const playerIntent = {
  id: "01a103a5-8567-7002-a177-17bd2ee37a8c",
  type: "page-type/played-panel",
  slug: "player-intent",
  definition: "the player's standing intent for his character, written and changed in place",
  code: "tsx",
  drawn: "js",
  place: "panel-place/journal",
  position: 55,
  createdAt: "2026-10-03T21:22:21.671Z",
  updatedAt: "2026-10-27T18:39:24.261Z",
} as const satisfies PlayedPanel
