import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00057 = {
  id: "01a0fd92-6460-7ae5-9e52-d66c1ec6aa37",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-057",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 57,
  stepStatus: "step-status/game-master",
  action: "I go refill at the shrine then come back to continue.",
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "place/overwhere-iii-merrowgate-guild-post",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
} as const satisfies StoryTurnPlayed
