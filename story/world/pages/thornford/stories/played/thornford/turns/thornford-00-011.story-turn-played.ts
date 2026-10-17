import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00011 = {
  id: "01a14bd8-beac-7c41-bd07-bc1ede5c15ed",
  type: "page-type/story-turn-played",
  slug: "thornford-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 11,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"I guess its time for me to start on the silk then."',
  beats: "jsonl",
  lore: ["lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:50:58.220Z",
  updatedAt: "2026-10-17T21:51:56.354Z",
  ownLength: 243,
  endsAt: "2026-04-29T22:30:00.000Z",
} as const satisfies StoryTurnPlayed
