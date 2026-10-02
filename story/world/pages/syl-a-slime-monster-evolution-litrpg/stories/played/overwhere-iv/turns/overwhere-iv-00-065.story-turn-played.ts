import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00065 = {
  id: "01a0fe2e-fe2f-7448-9d54-fde6b7e7d3d6",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-065",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 65,
  stepStatus: "step-status/game-master",
  action:
    "I leave the broken spear and carry just the head back to town, I’ll reimburse the guard for the spear, my replacement is already being made, and report back to the guild.",
  lore: [
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "place/overwhere-iv-crake-gill",
    "place/overwhere-iv-crowstone-quarry",
    "place/overwhere-iv-millbrook-gatehouse",
  ],
  endsAt: "2026-10-04T18:33:00.000Z",
} as const satisfies StoryTurnPlayed
