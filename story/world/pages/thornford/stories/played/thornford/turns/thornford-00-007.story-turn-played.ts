import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00007 = {
  id: "01a14bce-c707-7045-85e5-7c7a5ed829ac",
  type: "page-type/story-turn-played",
  slug: "thornford-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 7,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/player",
  action: "I sleep and then start again in the morning, working to make it perfect",
  beats: "jsonl",
  lore: ["lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:40:04.999Z",
  updatedAt: "2026-10-17T21:43:31.356Z",
  ownLength: 245,
  endsAt: "2026-04-29T20:32:00.000Z",
} as const satisfies StoryTurnPlayed
