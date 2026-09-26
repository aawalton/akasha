import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const personaCover = {
  id: "01a0de7f-617b-77b3-9594-4832f61e2915",
  type: "page-type/game-panel",
  slug: "persona-cover",
  definition: "the cover of each persona the play is with now",
  code: "tsx",
  place: "panel-place/aside",
} as const satisfies GamePanel
