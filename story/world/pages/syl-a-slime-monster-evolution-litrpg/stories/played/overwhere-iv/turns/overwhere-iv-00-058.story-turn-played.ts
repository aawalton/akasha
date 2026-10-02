import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00058 = {
  id: "01a0fd99-7c23-786a-9619-4b52f594e8e0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-058",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 58,
  stepStatus: "step-status/game-master",
  action:
    "I spend the afternoon training my spatial sense, then dinner, sleep, training, and back to the guild.",
  lore: [
    "lore/overwhere-iv-corr-children",
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "place/overwhere-iv-raiders-stream",
  ],
  endsAt: "2026-10-03T18:00:00.000Z",
} as const satisfies StoryTurnPlayed
