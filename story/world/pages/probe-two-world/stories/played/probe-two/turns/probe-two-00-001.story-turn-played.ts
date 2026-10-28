import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const probeTwo00001 = {
  id: "01a17fc3-3af2-7ba9-844a-d10b4e212784",
  type: "page-type/story-turn-played",
  slug: "probe-two-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/probe-two"],
  position: 1,
  prose: "txt",
  characters: ["character-player/probe-two-player"],
  stepStatus: "step-status/beats",
  action: "I walk over to the well and look down into it.",
  beats: "jsonl",
  lore: ["place/probe-two-world-square"],
  createdAt: "2026-10-27T23:47:43.474Z",
  updatedAt: "2026-10-28T00:00:59.557Z",
  ownLength: 159,
  endsAt: "2026-11-11T09:32:00.000Z",
} as const satisfies StoryTurnPlayed
