import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00030 = {
  id: "01a0f356-3e35-7f08-853b-0cd6f79c5d50",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-030",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 30,
  stepStatus: "step-status/game-master",
  action:
    "I attune the same combination again, but this time to manipulate and pull the corpse out from the ground, then do the same process for the second known hole, then start systematically working out from there, trying to find and finish the third one.",
  lore: [
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-09-30T10:49:00.000Z",
} as const satisfies StoryTurnPlayed
