import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00079 = {
  id: "01a0fdb8-f38e-7379-a1f0-91c7b13d2841",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-079",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 79,
  stepStatus: "step-status/game-master",
  action: "I find high ground and use my lenses to search for clues for where the bandits went.",
  lore: [
    "lore/overwhere-i-the-deserter-crew",
    "lore/overwhere-i-the-deserter-crew-2",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
