import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00006 = {
  id: "01a14bb8-37da-7e94-aab2-a852a5c6b910",
  type: "page-type/story-turn-played",
  slug: "thornford-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 6,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"All right, I\'ll see you tomorrow Shaestrel." After she leaves, I get to work.',
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
  createdAt: "2026-10-17T21:15:26.554Z",
  updatedAt: "2026-10-17T21:18:03.297Z",
  ownLength: 224,
  endsAt: "2026-04-28T22:40:00.000Z",
} as const satisfies StoryTurnPlayed
