import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00070 = {
  id: "01a0fe68-1b6a-7736-b5e7-483b126b8f4a",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-070",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 70,
  stepStatus: "step-status/game-master",
  action:
    "“Could you help me understand a few things, Marda? How do I level up faster and what do skill rarities mean?”",
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
} as const satisfies StoryTurnPlayed
