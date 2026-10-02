import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00050 = {
  id: "01a0fd3a-6d16-768a-b761-ff08bea4f753",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-050",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 50,
  stepStatus: "step-status/game-master",
  action: "I read through the rest in rapid succession before dinner.",
  lore: ["place/overwhere-iv-millbrook-shrine"],
} as const satisfies StoryTurnPlayed
