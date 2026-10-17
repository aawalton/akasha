import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00019 = {
  id: "01a14bf5-736b-78a6-8873-e1c9fc511a7c",
  type: "page-type/story-turn-played",
  slug: "thornford-00-019",
  cover: "image/image-42b3a05712f934eb",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 19,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/player",
  action:
    'I kiss her, hungrily, testing and exploring her mouth with my tongue. When we break away, I gasp "I feel a bit overdressed for this dance. Would you help me with that?"',
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
  coverAfter: "Then she sits down on the edge of your narrow bed and holds out her hand.",
  createdAt: "2026-10-17T22:22:19.498Z",
  updatedAt: "2026-10-17T22:24:50.268Z",
  ownLength: 288,
  endsAt: "2026-04-30T21:33:00.000Z",
} as const satisfies StoryTurnPlayed
