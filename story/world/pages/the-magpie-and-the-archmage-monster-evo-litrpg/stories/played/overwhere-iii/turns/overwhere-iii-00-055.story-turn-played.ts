import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00055 = {
  id: "01a0fd73-1a8b-7203-bb6c-17618a36bc0b",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-055",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 55,
  stepStatus: "step-status/game-master",
  action: "I work on the next blightstone while my mana lasts, then wind down for the night.",
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-marda-hesk",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
} as const satisfies StoryTurnPlayed
