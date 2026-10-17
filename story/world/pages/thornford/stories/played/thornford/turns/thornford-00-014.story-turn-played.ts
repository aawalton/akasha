import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00014 = {
  id: "01a14be0-6a56-7783-a95f-1e02da96a930",
  type: "page-type/story-turn-played",
  slug: "thornford-00-014",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 14,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: "I open the door and let her in, then get to work.",
  beats: "jsonl",
  lore: [
    "lore/thornford-fae-bargains-and-glamour",
    "lore/thornford-shaestrel",
    "place/thornford-town",
  ],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:59:20.918Z",
  updatedAt: "2026-10-17T22:03:53.739Z",
  ownLength: 293,
  endsAt: "2026-04-30T20:50:00.000Z",
} as const satisfies StoryTurnPlayed
