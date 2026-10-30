import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedTrial200008 = {
  id: "01a18dd8-a5c0-7b10-aea7-79b02a78df19",
  type: "page-type/story-turn-played",
  slug: "gifted-trial2-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-trial2"],
  position: 8,
  prose: "txt",
  stepStatus: "step-status/beats",
  action: "I go still again and listen for the word kerith.",
  beats: "jsonl",
  lore: ["lore/gifted-trial2-nala", "place/gifted-trial2-world-womb"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/holdings"],
  endsAt: "2026-10-28T09:40:00.000Z",
  createdAt: "2026-10-30T17:25:48.096Z",
  updatedAt: "2026-10-30T17:37:03.248Z",
  ownLength: 183,
  outcomes: "jsonl",
  characters: ["character-player/gifted-trial2-nala"],
} as const satisfies StoryTurnPlayed
