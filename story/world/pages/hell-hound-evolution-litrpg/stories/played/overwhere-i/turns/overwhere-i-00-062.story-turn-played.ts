import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00062 = {
  id: "01a0f7d8-4252-7853-8f44-20aa2eb652b8",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-062",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 62,
  stepStatus: "step-status/game-master",
  action:
    "I take my leave, get a bath and a meal, then go to bed. The go the next day with the other guy to retrieve the head.",
  lore: [
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "lore/overwhere-i-the-greyfen-alpha-2-2",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
