import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00043 = {
  id: "01a0e579-12b8-79f6-80cc-dc54ee5667f4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-043",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 43,
  turnStatus: "turn-status/game-master",
  action:
    "I circle around it and then tackle it, pressing myself to its skin and hold on as tight as I can.",
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
