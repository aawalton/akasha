import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00005 = {
  id: "01a14b9d-8913-7a0b-bd02-02b3dacab89d",
  type: "page-type/story-turn-played",
  slug: "thornford-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 5,
  stepStatus: "step-status/world-builder",
  action:
    "\"I'm definitely thinking, but it won't be your name. If you want me to know it, you'll have to tell me. I have a feeling it will be something you will quite enjoy.\"",
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T20:46:17.874Z",
  updatedAt: "2026-10-17T20:46:17.874Z",
} as const satisfies StoryTurnPlayed
