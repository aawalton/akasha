import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedTrial200007 = {
  id: "01a18dc9-68b2-75b1-b0d0-6b7ab4727ae2",
  type: "page-type/story-turn-played",
  slug: "gifted-trial2-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-trial2"],
  position: 7,
  prose: "txt",
  stepStatus: "step-status/beats",
  action: "I kick hard against the wall where the man's hand is pressing.",
  beats: "jsonl",
  lore: ["lore/gifted-trial2-nala", "place/gifted-trial2-world-womb"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/holdings", "story-reviewer/scene"],
  endsAt: "2026-10-28T09:25:00.000Z",
  createdAt: "2026-10-30T17:09:09.425Z",
  updatedAt: "2026-10-30T17:25:14.722Z",
  ownLength: 161,
  outcomes: "jsonl",
  characters: ["character-player/gifted-trial2-nala"],
} as const satisfies StoryTurnPlayed
