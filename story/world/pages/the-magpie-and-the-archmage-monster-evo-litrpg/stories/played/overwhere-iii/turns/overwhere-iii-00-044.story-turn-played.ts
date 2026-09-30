import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00044 = {
  id: "01a0f42f-44d2-7301-bd0d-3883768f7760",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-044",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 44,
  stepStatus: "step-status/game-master",
  action:
    "I pause to go to the Post to spend my mana on cleansing blight stones, then I spend the day reading Brannagh’s book, going back to the post again to drain my mana whenever it gets close to full. If I finish the book, I go back to the Post to read more in the bestiary.",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-marda-hesk",
  ],
} as const satisfies StoryTurnPlayed
