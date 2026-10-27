import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const cloneProbe00001 = {
  id: "01a17f5b-1440-7572-9b26-ad1db0207389",
  type: "page-type/story-turn-played",
  slug: "clone-probe-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/clone-probe"],
  position: 1,
  prose: "txt",
  characters: ["character-player/clone-probe-player"],
  stepStatus: "step-status/beats",
  action: "I look around the hall and check my sword's edge.",
  beats: "jsonl",
  endsAt: "2026-11-06T08:50:00.000Z",
  createdAt: "2026-10-27T21:53:57.824Z",
  updatedAt: "2026-10-27T22:04:35.110Z",
  ownLength: 75,
} as const satisfies StoryTurnPlayed
