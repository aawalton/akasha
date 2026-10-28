import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const timeProbe00001 = {
  id: "01a1802f-0ce4-78ba-8f4a-2910c51d7bbd",
  type: "page-type/story-turn-played",
  slug: "time-probe-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/time-probe"],
  position: 1,
  stepStatus: "step-status/game-master",
  action: "I sit on the bench by the well and watch the square for a while.",
  lore: ["place/time-probe-world-square"],
  interruptsAt: "2026-11-13T12:40:00.000Z",
  createdAt: "2026-10-28T01:45:29.572Z",
  updatedAt: "2026-10-28T01:50:48.404Z",
} as const satisfies StoryTurnPlayed
