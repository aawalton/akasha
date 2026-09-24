import type { GameDesignEntry } from "akasha/story/game/game-design-entry/game-design-entry.page-type.types.ts"

export const haremHotelFloor1V2 = {
  id: "01a0c946-5b00-75de-b884-9b1a844f4e29",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-floor-1-v2",
  title: "Floor 1",
  game: "story-game/harem-hotel",
  kind: "floor-design",
  source:
    "PUBLISHED CANON WINS: published turn-1 (Alan wakes at the bottom of the hotel EMPTY-HANDED; game-entity alan sheet equipment.weapon = null) + Alan ruling 2026-07-13 (the starting iron bar never landed in canon; DROP it rather than establish it — he faces floor 1 unarmed, the floor's reward is his FIRST weapon not a replacement).",
  supersedes: "game-design-entry/harem-hotel-floor-1",
  note: "md",
} as const satisfies GameDesignEntry
