import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00007 = {
  id: "01a0f178-4c56-71ea-8f13-5a38f5a434c8",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    "“I’m not certain. I would gladly do so if I can, but I would need to visit one of the stones first. Do you know how far it is to the nearest?”",
  lore: [
    "lore/overwhere-ii-garth-marsh",
    "place/overwhere-ii-carrowmouth",
    "place/overwhere-ii-wendlemere",
  ],
  endsAt: "2026-09-29T07:37:00.000Z",
} as const satisfies StoryTurnPlayed
