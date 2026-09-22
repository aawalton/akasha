import type { GamePanel } from "akasha/story/game/panel/game-panel.page-type.types.ts"

export const storySoFar = {
  id: "01a0c4a3-809b-7891-b681-3ec76c1a02d9",
  type: "page-type/game-panel",
  slug: "story-so-far",
  definition: "what has happened up to now, chapter by chapter",
  code: "tsx",
  drawn: "js",
  place: "panel-place/above",
} as const satisfies GamePanel
