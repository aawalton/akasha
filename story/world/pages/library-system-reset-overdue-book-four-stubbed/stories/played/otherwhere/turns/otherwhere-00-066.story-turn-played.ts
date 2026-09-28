import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00066 = {
  id: "01a0e82b-7ba1-79db-b222-22e4fff95f64",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-066",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 66,
  turnStatus: "turn-status/game-master",
  action:
    "**Okay, time for bed.** I go back to my room, take off the robe and slippers, lie down on the bed naked, and go to sleep.",
  lore: ["lore/otherwhere-golems", "lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
