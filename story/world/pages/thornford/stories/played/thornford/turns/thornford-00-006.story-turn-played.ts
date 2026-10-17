import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00006 = {
  id: "01a14bcb-07a5-7118-9514-c81f7b730e51",
  type: "page-type/story-turn-played",
  slug: "thornford-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 6,
  stepStatus: "step-status/world-builder",
  action: '"All right, I\'ll see you tomorrow Shaestrel." After she leaves, I get to work.',
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:35:59.396Z",
  updatedAt: "2026-10-17T21:36:40.117Z",
  endsAt: "2026-04-28T22:45:00.000Z",
} as const satisfies StoryTurnPlayed
