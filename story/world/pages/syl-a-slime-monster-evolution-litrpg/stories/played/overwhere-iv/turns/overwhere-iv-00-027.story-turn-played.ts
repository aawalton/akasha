import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00027 = {
  id: "01a0f3a6-fcee-70ab-a1b7-6a05c6b304c3",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-027",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 27,
  stepStatus: "step-status/game-master",
  action:
    "I let the goblin escape and report back to the farmer, then to the alchemist to trade my cores for coins, then to the healer to heal the arm, then to the guild to report on the slimes and the goblines",
  lore: [
    "lore/overwhere-iv-brookside-four",
    "place/overwhere-iv-hobb-farm",
    "place/overwhere-iv-millbrook",
    "place/overwhere-iv-millbrook-adventurers-hall",
  ],
  endsAt: "2026-09-30T19:25:00.000Z",
} as const satisfies StoryTurnPlayed
