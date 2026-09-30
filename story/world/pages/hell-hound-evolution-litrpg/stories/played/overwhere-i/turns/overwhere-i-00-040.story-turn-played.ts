import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00040 = {
  id: "01a0f3b3-4f7e-7520-9229-8c5255f332cd",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-040",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 40,
  stepStatus: "step-status/game-master",
  action:
    "I attune water and pull the beast through its entrance hole, into the water, and then back onto the shore. “Three renders accounted for.”",
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-09-30T11:12:00.000Z",
} as const satisfies StoryTurnPlayed
