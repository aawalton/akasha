import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedPolish00007 = {
  id: "01a18e2d-a66b-757c-8190-a7e06d15de73",
  type: "page-type/story-turn-played",
  slug: "gifted-polish-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-polish"],
  position: 7,
  prose: "txt",
  stepStatus: "step-status/player",
  action:
    "I go still and listen to the deep voice repeating its few sounds, trying to hold onto the shape of them.",
  beats: "jsonl",
  lore: ["lore/gifted-polish-nala", "place/gifted-polish-world-womb"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  createdAt: "2026-10-30T18:58:38.827Z",
  updatedAt: "2026-10-30T19:08:22.207Z",
  ownLength: 193,
  outcomes: "jsonl",
  characters: ["character-player/gifted-polish-nala"],
  endsAt: "2026-10-28T09:35:00.000Z",
  memoryOwed: true,
} as const satisfies StoryTurnPlayed
