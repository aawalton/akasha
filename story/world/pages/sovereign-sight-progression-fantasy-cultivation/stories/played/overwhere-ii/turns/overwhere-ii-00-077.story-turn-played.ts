import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00077 = {
  id: "01a0fe33-e0be-7f88-8c1d-2db4a8e173aa",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-077",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 77,
  stepStatus: "step-status/game-master",
  action: "I sleep, giving my Locks time to recover",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-ashlin-farm",
  ],
} as const satisfies StoryTurnPlayed
