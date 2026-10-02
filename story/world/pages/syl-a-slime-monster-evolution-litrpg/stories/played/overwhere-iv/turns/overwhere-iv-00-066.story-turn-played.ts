import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00066 = {
  id: "01a0fe3a-24b1-7313-b93b-ec5ed7eddb51",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-066",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 66,
  stepStatus: "step-status/game-master",
  action:
    "I take a bath after the long day, get dinner, and sleep, then train with the guard in the morning and check in on my new spear.",
  lore: [
    "place/overwhere-iv-brook-and-barrel",
    "place/overwhere-iv-millbrook-gatehouse",
    "place/overwhere-iv-millbrook-smithy",
  ],
} as const satisfies StoryTurnPlayed
