import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00012 = {
  id: "01a0eb16-faae-7d72-86ff-451193a58de4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 12,
  stepStatus: "step-status/game-master",
  action:
    "I test my durability against the glass to see if it still cuts my skin, then I do my best to drink the blood of the beast for water and nourishment.",
  lore: ["lore/otherwhere-ix-shardback", "lore/otherwhere-ix-survival"],
  endsAt: "2026-09-28T15:50:00.000Z",
} as const satisfies StoryTurnPlayed
