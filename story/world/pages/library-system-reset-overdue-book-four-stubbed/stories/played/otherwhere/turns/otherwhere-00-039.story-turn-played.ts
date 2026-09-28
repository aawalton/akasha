import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00039 = {
  id: "01a0e559-09a7-7c41-a232-2aa0086de381",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-039",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 39,
  turnStatus: "turn-status/game-master",
  action:
    "I put on a robe and slippers and tie it closed with the belt, bringing the pouch along for good measure, then go looking for the bread.",
  lore: ["place/otherwhere-kitchen", "lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
