import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00007 = {
  id: "01a0e9da-5202-7077-9fdd-b564f5759119",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 7,
  stepStatus: "step-status/game-master",
  action: "I keep circling the beach, looking for a source of fresh water",
  lore: [
    "place/otherwhere-black-shore",
    "place/otherwhere-glassrun",
    "place/otherwhere-lowland-wood",
  ],
} as const satisfies StoryTurnPlayed
