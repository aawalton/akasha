import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00006 = {
  id: "01a0f16d-fc6f-7158-b5df-fba2c429a60a",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "“I'll gladly accept the porridge and then be on my way. Are there any threats in the area I should be aware of?”",
  lore: [
    "lore/overwhere-ii-garth-marsh",
    "lore/overwhere-ii-greymaws",
    "lore/overwhere-ii-wren-marsh",
    "place/overwhere-ii-marsh-croft",
    "place/overwhere-ii-tern-hollow",
    "place/overwhere-ii-wendlemere",
  ],
} as const satisfies StoryTurnPlayed
