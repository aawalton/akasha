import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00003 = {
  id: "01a14b91-3532-7239-83f1-cab3aa09590b",
  type: "page-type/story-turn-played",
  slug: "thornford-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 3,
  stepStatus: "step-status/world-builder",
  action: '"Deal"',
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T20:32:49.969Z",
  updatedAt: "2026-10-17T20:32:49.969Z",
} as const satisfies StoryTurnPlayed
