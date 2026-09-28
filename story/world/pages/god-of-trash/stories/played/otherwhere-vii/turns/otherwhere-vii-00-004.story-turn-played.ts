import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00004 = {
  id: "01a0ea51-412d-7b89-ac19-0a6ce200afd7",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 4,
  stepStatus: "step-status/game-master",
  action: '"I\'ll take the ride, but keep the shirt, thanks."',
  lore: ["place/otherwhere-vii-ashford-road", "lore/otherwhere-vii-ennis"],
} as const satisfies StoryTurnPlayed
