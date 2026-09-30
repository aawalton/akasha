import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00010 = {
  id: "01a0f1a8-9b77-7481-a296-3a9b3593dd58",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 10,
  stepStatus: "step-status/game-master",
  action: "I fill out the card honestly and watch for her reaction.",
  lore: [
    "lore/overwhere-iii-magic",
    "lore/overwhere-iii-marda-hesk",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
} as const satisfies StoryTurnPlayed
