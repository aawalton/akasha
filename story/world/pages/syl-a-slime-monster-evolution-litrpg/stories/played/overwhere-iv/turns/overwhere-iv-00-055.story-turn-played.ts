import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00055 = {
  id: "01a0fd79-72f7-7c0e-a3cd-635d0f057956",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-055",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 55,
  stepStatus: "step-status/game-master",
  action:
    "I go and tell a heroic tale, sure to attribute each kill to a careful cut with my spear skill, then go back to the guild to turn in the quest and the ears and ask about where I could get a better spear.",
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "place/overwhere-iv-millbrook-smithy",
    "place/overwhere-iv-tull-farm",
  ],
  endsAt: "2026-10-03T14:35:00.000Z",
} as const satisfies StoryTurnPlayed
