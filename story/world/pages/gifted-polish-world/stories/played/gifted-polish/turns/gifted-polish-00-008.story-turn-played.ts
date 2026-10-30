import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedPolish00008 = {
  id: "01a18e49-8a3c-71b8-9563-4827cf50709f",
  type: "page-type/story-turn-played",
  slug: "gifted-polish-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-polish"],
  position: 8,
  prose: "txt",
  stepStatus: "step-status/beats",
  action:
    "I keep listening, and when the deep voice comes again I try to make the same shape back with my own mouth.",
  beats: "jsonl",
  lore: ["lore/gifted-polish-nala", "place/gifted-polish-world-womb"],
  createdAt: "2026-10-30T19:29:06.619Z",
  updatedAt: "2026-10-30T19:32:26.953Z",
  ownLength: 182,
  outcomes: "jsonl",
  characters: ["character-player/gifted-polish-nala"],
  endsAt: "2026-10-29T09:15:00.000Z",
} as const satisfies StoryTurnPlayed
