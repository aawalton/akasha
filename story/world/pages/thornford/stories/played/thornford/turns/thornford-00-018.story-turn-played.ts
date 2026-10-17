import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00018 = {
  id: "01a14bee-8e27-797f-adf1-a816b67486da",
  type: "page-type/story-turn-played",
  slug: "thornford-00-018",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 18,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action:
    "I turn her around and slowly undo the hooks, taking the time to kiss her back as I go down, inch by inch.",
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
  createdAt: "2026-10-17T22:14:47.590Z",
  updatedAt: "2026-10-17T22:16:00.409Z",
  ownLength: 136,
  endsAt: "2026-04-30T21:27:00.000Z",
} as const satisfies StoryTurnPlayed
