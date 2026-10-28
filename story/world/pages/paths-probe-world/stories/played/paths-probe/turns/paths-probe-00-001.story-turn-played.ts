import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const pathsProbe00001 = {
  id: "01a18009-7d22-73d9-a436-525699474939",
  type: "page-type/story-turn-played",
  slug: "paths-probe-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/paths-probe"],
  position: 1,
  prose: "txt",
  characters: ["character-player/paths-probe-player"],
  stepStatus: "step-status/player",
  action: "I look over what I can do.",
  beats: "jsonl",
  ownLength: 9,
  createdAt: "2026-10-28T01:04:27.937Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies StoryTurnPlayed
