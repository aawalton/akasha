import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00044 = {
  id: "01a0f463-b990-7b89-86a7-df411235e179",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-044",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 44,
  stepStatus: "step-status/game-master",
  action:
    "I spend the day reading Brannagh’s book, going back to the post again to drain my mana whenever it gets close to full, but only after the healing touchup. If I finish the book, I go back to the Post to read more in the bestiary. If I finish cleansing any blightstones, I collect the resulting glimmerstones.",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-hild-wendle",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
} as const satisfies StoryTurnPlayed
