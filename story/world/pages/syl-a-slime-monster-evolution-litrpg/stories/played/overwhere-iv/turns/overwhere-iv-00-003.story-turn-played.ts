import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00003 = {
  id: "01a0f171-f4d3-7838-a623-0eb04528d3cc",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "“Gladly, thank you.” I climb up. “I find I need to take my mind off of recent events. Would you talk me about yourself and the area?”",
  lore: ["lore/overwhere-iv-garrett-pell", "lore/overwhere-iv-maud-tarrow"],
  endsAt: "2026-09-29T12:24:00.000Z",
} as const satisfies StoryTurnPlayed
