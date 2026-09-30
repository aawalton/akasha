import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00039 = {
  id: "01a0f3a9-590a-7a12-8d96-73743a299f90",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-039",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 39,
  stepStatus: "step-status/game-master",
  action:
    "I attune water and fire, boiling the water in the underground den to superheated temperatures directly.",
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
