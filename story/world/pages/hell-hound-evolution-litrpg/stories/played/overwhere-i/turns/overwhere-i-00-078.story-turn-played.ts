import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00078 = {
  id: "01a0fdab-3196-7da1-a4fa-b26b501ef619",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-078",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 78,
  stepStatus: "step-status/game-master",
  action:
    "I use my concentrated beam of fire to finish the two men, aiming for the heads, then quietly start tracking the four that got away",
  lore: [
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
  ],
} as const satisfies StoryTurnPlayed
