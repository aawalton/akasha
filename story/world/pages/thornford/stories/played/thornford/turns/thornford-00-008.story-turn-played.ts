import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00008 = {
  id: "01a14bd3-1c39-7ea2-9785-d4d1a915473c",
  type: "page-type/story-turn-played",
  slug: "thornford-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 8,
  stepStatus: "step-status/world-builder",
  action: '"Porridge is great. My goal is to make you look delicious anyways" I say with a wink',
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:44:48.953Z",
  updatedAt: "2026-10-17T21:44:48.953Z",
} as const satisfies StoryTurnPlayed
