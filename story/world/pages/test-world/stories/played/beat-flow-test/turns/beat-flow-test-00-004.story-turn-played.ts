import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const beatFlowTest00004 = {
  id: "01a17fa2-2a4b-7861-9259-d629fae50e87",
  type: "page-type/story-turn-played",
  slug: "beat-flow-test-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/beat-flow-test"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    "Then I get up and walk to the green door of the shop.\n\nAt the door I knock twice and wait.",
  lore: [
    "lore/test-world-folk",
    "lore/test-world-overview",
    "place/test-world-hall",
    "place/test-world-shop",
  ],
  createdAt: "2026-10-27T23:11:36.522Z",
  updatedAt: "2026-10-28T00:38:34.257Z",
} as const satisfies StoryTurnPlayed
