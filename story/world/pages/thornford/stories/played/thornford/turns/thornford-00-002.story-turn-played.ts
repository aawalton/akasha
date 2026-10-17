import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00002 = {
  id: "01a14b7a-75bb-7f1f-80bd-569458521072",
  type: "page-type/story-turn-played",
  slug: "thornford-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 2,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"Better than coin, eh? I\'m listening."',
  beats: "jsonl",
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  roleplayed: true,
  createdAt: "2026-10-17T20:07:59.163Z",
  updatedAt: "2026-10-17T20:10:13.223Z",
  ownLength: 168,
  endsAt: "2026-04-28T18:07:00.000Z",
} as const satisfies StoryTurnPlayed
