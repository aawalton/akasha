import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00055 = {
  id: "01a0f461-9c03-7f53-8367-a325a4321807",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-055",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 55,
  stepStatus: "step-status/game-master",
  action:
    "I use an earth attunement to pull out the hard knots, curious to see what they might be.",
  lore: [
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-western-march",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-10-01T13:57:00.000Z",
} as const satisfies StoryTurnPlayed
