import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00007 = {
  id: "01a0f1ac-2e9c-7182-ba15-d79d53235238",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 7,
  stepStatus: "step-status/game-master",
  action: "I get changed and then wander over to check out the adventures guild",
  lore: ["lore/overwhere-iv-ilsa-crane", "place/overwhere-iv-millbrook-adventurers-hall"],
} as const satisfies StoryTurnPlayed
