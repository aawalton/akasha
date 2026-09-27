import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00031 = {
  id: "01a0e51c-b07a-74c8-b5b4-7d4b3fbdd0ba",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-031",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 31,
  turnStatus: "turn-status/game-master",
  action:
    "“Okay, Links. The small ones are done but we’re out of salt. How do we deal with the big one?”",
  lore: ["place/otherwhere-hall-back", "lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
