import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00010 = {
  id: "01a0ea7c-65c2-75fa-818a-8dd3263b73ef",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 10,
  stepStatus: "step-status/game-master",
  action: '"I will"',
  lore: ["lore/otherwhere-iv-gu-household", "lore/otherwhere-iv-earth-god-shrine"],
} as const satisfies StoryTurnPlayed
