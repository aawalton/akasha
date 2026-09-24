import type { GameDesignEntry } from "akasha/story/game/game-design-entry/game-design-entry.page-type.types.ts"

export const haremHotelWorldLogicChallengeDoorV3 = {
  id: "01a0c946-5c00-7639-a634-42578d156c51",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-world-logic-challenge-door-v3",
  title: "Challenge Door",
  game: "story-game/harem-hotel",
  kind: "world-logic",
  source:
    "Alan's premise ruling 2026-07-13: 'floor one should be COMBAT, not a puzzle'; Aria scaled down to level 1 (peer); full rewind to end-of-t12, restart from the door.",
  supersedes: "game-design-entry/harem-hotel-world-logic-challenge-door-v2",
  note: "md",
} as const satisfies GameDesignEntry
