import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00017 = {
  id: "01a14bec-7cbb-7cc4-b180-bd6816cc72ff",
  type: "page-type/story-turn-played",
  slug: "thornford-00-017",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 17,
  stepStatus: "step-status/world-builder",
  action:
    "\"Oh, we'll dance in dresses at the ball, but this dance is better away from prying eyes. Care to join me in the back? I'm sure you know the steps.\"",
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T22:12:32.059Z",
  updatedAt: "2026-10-17T22:13:13.900Z",
  endsAt: "2026-04-30T21:22:00.000Z",
} as const satisfies StoryTurnPlayed
