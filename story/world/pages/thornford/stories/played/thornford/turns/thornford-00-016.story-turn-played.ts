import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00016 = {
  id: "01a14be9-7aea-778d-86dc-9c51a0c22fcb",
  type: "page-type/story-turn-played",
  slug: "thornford-00-016",
  cover: "image/image-2a6ce3429b198b18",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 16,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/player",
  action:
    'I step in closer to her, putting one hand behind her back at her waist and the other behind her head, leaning in close. "I\'m have my question for you now. Would you like to dance?"',
  beats: "jsonl",
  lore: ["lore/thornford-fae-bargains-and-glamour", "lore/thornford-shaestrel"],
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
  coverAfter: "She stays where she is, in your arms, her finger still resting on your mouth.",
  createdAt: "2026-10-17T22:09:14.986Z",
  updatedAt: "2026-10-17T22:14:59.742Z",
  ownLength: 112,
  endsAt: "2026-04-30T21:20:00.000Z",
} as const satisfies StoryTurnPlayed
