import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00009 = {
  id: "01a14bd4-e34a-7d53-88e0-59fecb041262",
  type: "page-type/story-turn-played",
  slug: "thornford-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 9,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action:
    "I put the dress on her and get started with the fitting, just a little bit more handsy than I strictly need to be.",
  beats: "jsonl",
  lore: ["lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory"],
  roleplayed: true,
  createdAt: "2026-10-17T21:46:45.450Z",
  updatedAt: "2026-10-17T21:48:09.370Z",
  ownLength: 194,
  endsAt: "2026-04-29T20:55:00.000Z",
} as const satisfies StoryTurnPlayed
