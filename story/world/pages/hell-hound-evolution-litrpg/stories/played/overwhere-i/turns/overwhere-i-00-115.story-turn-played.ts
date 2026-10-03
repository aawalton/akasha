import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00115 = {
  id: "01a101da-fa5d-783b-8116-b529d8836500",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-115",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 115,
  stepStatus: "step-status/game-master",
  action:
    "I spend the afternoon testing weaves to see if I can get something to repair the tears in my clothes.",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-2-2",
  ],
} as const satisfies StoryTurnPlayed
