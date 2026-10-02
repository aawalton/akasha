import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00069 = {
  id: "01a0fe5a-7a7c-7d2f-910a-d19c6e6e0fea",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-069",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 69,
  stepStatus: "step-status/game-master",
  action:
    "I go back to the post and work on cleansing blightstones, experimenting with ways to do it more efficiently",
  lore: [
    "lore/overwhere-iii-braid-weaving",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-marda-hesk",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
} as const satisfies StoryTurnPlayed
