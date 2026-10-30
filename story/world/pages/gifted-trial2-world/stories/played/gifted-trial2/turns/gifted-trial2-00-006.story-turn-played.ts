import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedTrial200006 = {
  id: "01a18db2-606a-7850-8ca6-4acf9e9bd2cc",
  type: "page-type/story-turn-played",
  slug: "gifted-trial2-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-trial2"],
  position: 6,
  prose: "txt",
  stepStatus: "step-status/beats",
  action:
    "I hold very still and strain to make out what the low voices beyond the walls are saying.",
  beats: "jsonl",
  lore: ["lore/gifted-trial2-nala", "place/gifted-trial2-world-womb"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/holdings", "story-reviewer/scene"],
  endsAt: "2026-10-28T09:15:00.000Z",
  createdAt: "2026-10-30T16:43:59.978Z",
  updatedAt: "2026-10-30T17:06:45.133Z",
  ownLength: 284,
  outcomes: "jsonl",
  characters: ["character-player/gifted-trial2-nala"],
} as const satisfies StoryTurnPlayed
