import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00042 = {
  id: "01a0e571-917d-7c47-aa1f-ced68c5db433",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-042",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 42,
  turnStatus: "turn-status/game-master",
  action: "I run back to the entrance and get another bag and repeat the process.",
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
