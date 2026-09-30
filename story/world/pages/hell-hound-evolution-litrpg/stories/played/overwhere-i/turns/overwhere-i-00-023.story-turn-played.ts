import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00023 = {
  id: "01a0f215-976a-71ac-9b5d-11384c99b2b4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-023",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 23,
  stepStatus: "step-status/game-master",
  action:
    "I make the water blade again and use it to just cut off the tusks, focusing on making it spin even faster and thinner.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-fenwatch",
  ],
} as const satisfies StoryTurnPlayed
