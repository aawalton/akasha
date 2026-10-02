import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00061 = {
  id: "01a0fdc7-0aa1-7001-b06b-e802e1c5d412",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-061",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 61,
  stepStatus: "step-status/game-master",
  action: "I get dinner and sleep, then stop by Brannagh’s again in the morning",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-mending-weave",
    "place/overwhere-iii-crook-and-candle",
  ],
} as const satisfies StoryTurnPlayed
