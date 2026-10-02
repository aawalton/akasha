import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00058 = {
  id: "01a0fda1-a1d6-7a42-8b6d-6a3d5bab8055",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-058",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 58,
  stepStatus: "step-status/game-master",
  action: "I go for lunch, the back to the shrine to recover, then check in at Brannagh’s again",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "place/overwhere-iii-crook-and-candle",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
} as const satisfies StoryTurnPlayed
