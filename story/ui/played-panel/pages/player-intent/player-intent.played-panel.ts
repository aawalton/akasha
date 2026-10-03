import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const playerIntent = {
  id: "01a103a5-8567-7002-a177-17bd2ee37a8c",
  type: "page-type/played-panel",
  slug: "player-intent",
  definition: "the player's standing intent for his character, written and changed in place",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 55,
} as const satisfies PlayedPanel
