import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00005 = {
  id: "01a0ea5b-f57b-7715-a48e-bcb3dc00bd05",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 5,
  stepStatus: "step-status/game-master",
  action:
    '"Thanks for the tip. Harvest is always busy, so I\'ll help there if I can. Who should I talk to about that?"',
  lore: ["place/otherwhere-vii-ashford", "lore/otherwhere-vii-ennis"],
  endsAt: "2026-09-28T07:09:00.000Z",
} as const satisfies StoryTurnPlayed
