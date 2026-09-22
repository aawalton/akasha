import type { GameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.types.ts"

export const theTowerWorldLogicDeathLoop = {
  id: "01a0c946-16a8-7e38-95d2-072fbe766903",
  type: "page-type/game-design-entry",
  slug: "the-tower-world-logic-death-loop",
  title: "Death Loop",
  game: "game/the-tower",
  kind: "world-logic",
  source: "Alan ruling 2026-06-24, held dark until the first death",
  note: "md",
} as const satisfies GameDesignEntry
