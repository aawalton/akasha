import type { GamePanel } from "akasha/story/game/panel/game-panel.page-type.types.ts"

export const characterSheet = {
  id: "01a0c4a2-c666-7d73-9def-422c118760d9",
  type: "page-type/game-panel",
  slug: "character-sheet",
  definition: "what a character is made of, as the play has left it",
  code: "tsx",
  place: "panel-place/aside",
} as const satisfies GamePanel
