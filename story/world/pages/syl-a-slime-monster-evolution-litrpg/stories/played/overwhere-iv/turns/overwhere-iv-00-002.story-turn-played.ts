import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00002 = {
  id: "01a0f165-dfc9-799d-9eff-9ba2e1aa89a0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 2,
  stepStatus: "step-status/game-master",
  action: "“Hello! I seem to have gotten lost. Could you tell me where I am?”",
  lore: ["lore/overwhere-iv-garrett-pell", "place/overwhere-iv-millbrook"],
  endsAt: "2026-09-29T12:04:00.000Z",
} as const satisfies StoryTurnPlayed
