import type { GameDesignEntry } from "akasha/story/game/game-design-entry/game-design-entry.page-type.types.ts"

export const haremHotelFloor1V4 = {
  id: "01a0c946-5b4d-750b-a838-2292cc0c2e6c",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-floor-1-v4",
  title: "Floor 1",
  game: "story-game/harem-hotel",
  kind: "floor-design",
  source:
    "Alan's premise ruling 2026-07-13: 'floor one should be COMBAT, not a puzzle'; Aria scaled to level 1 (bound peer, world-logic-companion-bind); full rewind to end-of-t12, restart from the door.",
  supersedes: "game-design-entry/harem-hotel-floor-1-v3",
  note: "md",
} as const satisfies GameDesignEntry
