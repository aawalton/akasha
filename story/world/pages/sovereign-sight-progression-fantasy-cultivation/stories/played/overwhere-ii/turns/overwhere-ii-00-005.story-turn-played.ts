import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00005 = {
  id: "01a0f163-4eb7-79dd-b1d4-bd22ee5708b0",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 5,
  stepStatus: "step-status/game-master",
  action:
    "“I’m Nala, I mean you no harm. I’m on a mission but seem to have gotten lost. Could you tell me where I am precisely?”",
  lore: [
    "lore/overwhere-ii-garth-marsh",
    "place/overwhere-ii-tern-hollow",
    "place/overwhere-ii-wendlemere",
  ],
} as const satisfies StoryTurnPlayed
