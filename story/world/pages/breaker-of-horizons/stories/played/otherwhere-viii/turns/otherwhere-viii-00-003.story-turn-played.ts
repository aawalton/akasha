import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00003 = {
  id: "01a0ea59-b1a3-71bb-9d2e-d2886a26adf4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "\"Just a hard night I think. The gardens are lovely, but I don't think I've been here before. Would you point me the way back to the Academy?\"",
  lore: ["place/otherwhere-viii-weir-gardens", "place/otherwhere-viii-low-bank"],
  endsAt: "2026-09-28T05:50:00.000Z",
} as const satisfies StoryTurnPlayed
