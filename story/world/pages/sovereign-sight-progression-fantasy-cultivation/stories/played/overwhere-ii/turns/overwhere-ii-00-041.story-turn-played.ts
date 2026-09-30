import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00041 = {
  id: "01a0f3d8-4733-77a4-b827-4fe6bd914488",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-041",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 41,
  stepStatus: "step-status/game-master",
  action:
    "I leave the tarn behind and continue with my plan, collecting the remaining ears and reporting back.",
  lore: [
    "lore/overwhere-ii-reeve-corwin-dray",
    "place/overwhere-ii-hollow-tarn",
    "place/overwhere-ii-tarn-screes",
  ],
  endsAt: "2026-09-30T15:03:00.000Z",
} as const satisfies StoryTurnPlayed
