import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const proseChannel = {
  id: "01a0c4d0-2f88-7cca-9f89-e17e3fd599d8",
  type: "page-type/game-panel",
  slug: "prose-channel",
  definition: "the run of prose play left a story, turn by turn",
  place: "panel-place/run",
  code: "tsx",
  drawn: "js",
} as const satisfies GamePanel
