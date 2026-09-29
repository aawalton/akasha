import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00008 = {
  id: "01a0eaf6-1e39-767b-af39-11d3bddd4eab",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    "\"I'll gladly work, but I'll warn you, today is the first time I've seen a sheep close enough to touch one. You'll need to teach me what to do.\"",
  lore: ["lore/otherwhere-xi-wenna-ashlar", "place/otherwhere-xi-ashlar-farm"],
} as const satisfies StoryTurnPlayed
