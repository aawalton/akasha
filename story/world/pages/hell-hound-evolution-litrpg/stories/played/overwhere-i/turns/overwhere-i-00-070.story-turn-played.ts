import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00070 = {
  id: "01a0fd49-057f-72b6-9ffa-b76aab86e7a4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-070",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 70,
  stepStatus: "step-status/game-master",
  action:
    "I use the burst of air and fire I prescribed previously to engulf all five and the wolf in an inferno, ramping up the heat continuously.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
