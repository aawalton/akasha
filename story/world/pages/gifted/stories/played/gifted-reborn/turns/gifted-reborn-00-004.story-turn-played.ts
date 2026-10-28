import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00004 = {
  id: "01a17fec-b8bb-7b10-b475-6878a98f2706",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 4,
  prose: "txt",
  characters: ["character-player/gifted-reborn-nala"],
  stepStatus: "step-status/player",
  action:
    "I look through the status in wonder and think about what it means, then quickly get bored. To pass the time, I start doing mental math, first just counting, then counting my intervals up and down, then by multiples up and down, while I pass the time.",
  beats: "jsonl",
  lore: [
    "lore/gifted-myriad-paths",
    "lore/gifted-reborn-nala",
    "lore/gifted-souls-and-demons",
    "place/gifted-womb",
  ],
  reviewedBy: [
    "story-reviewer/scene",
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/style",
  ],
  interruptsAt: "2026-10-27T22:00:00.000Z",
  createdAt: "2026-10-28T00:33:02.651Z",
  updatedAt: "2026-10-28T15:44:35.552Z",
  ownLength: 268,
  endsAt: "2026-10-27T22:00:00.000Z",
  outcomes: "jsonl",
} as const satisfies StoryTurnPlayed
