import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00052 = {
  id: "01a0fd54-d8e1-707c-9925-7da98670de02",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-052",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 52,
  stepStatus: "step-status/game-master",
  action:
    "I go and rest at the shrine until my mana is full again, then go back to Brannagh’s and heal the burn if he’s still there, then check at the Post again",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-mending-weave",
    "place/overwhere-iii-merrowgate-guild-post",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
} as const satisfies StoryTurnPlayed
