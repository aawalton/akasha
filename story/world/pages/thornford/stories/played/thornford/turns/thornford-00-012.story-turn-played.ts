import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00012 = {
  id: "01a14bdc-9a64-78b3-9009-57b967e35a90",
  type: "page-type/story-turn-played",
  slug: "thornford-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 12,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action:
    "\"Why thank you. I'm afraid my hair stays with me though, so if you are interested in it as an accessory, you'll have to bring me to the ball.\"",
  beats: "jsonl",
  lore: ["lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  roleplayed: true,
  createdAt: "2026-10-17T21:55:11.076Z",
  updatedAt: "2026-10-17T21:56:39.800Z",
  ownLength: 115,
  endsAt: "2026-04-29T22:33:00.000Z",
} as const satisfies StoryTurnPlayed
