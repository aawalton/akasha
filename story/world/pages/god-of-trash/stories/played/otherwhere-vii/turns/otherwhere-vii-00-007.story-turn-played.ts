import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00007 = {
  id: "01a0ea88-705e-731e-827e-4ccc7790fe5e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    "\"My father was a scribe. I've mostly worked with my wits and not my muscles. I can read, write, and do sums, but not sure that's needed here.\"",
  lore: ["lore/otherwhere-vii-aldo-reeve", "place/otherwhere-vii-ashford"],
  endsAt: "2026-09-28T08:14:00.000Z",
} as const satisfies StoryTurnPlayed
