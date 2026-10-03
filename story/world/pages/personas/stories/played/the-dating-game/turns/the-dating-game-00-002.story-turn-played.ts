import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00002 = {
  id: "01a0de91-c157-7f6c-afd3-7ec7f69e7a94",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-002",
  cover: "image/image-2eb5c8b36dbee5e8",
  coverAfter: "She looks mid-twenties. Her dark brown hair is knotted by the wind,",
  ownLength: 473,
  partOfCollections: ["story-played/the-dating-game"],
  position: 2,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  unit: "unit/words",
  stepStatus: "step-status/player",
  action:
    "I eat a quiet breakfast, looking out over the valley, then get dressed in my favorite comfortable clothing: black shorts over black compression tights, light blue dusty Ecco slip-ons, and a loose grey athletic shirt, then go out my door, and start hiking up to Rock Canyon",
  beats: "jsonl",
  lore: [
    "lore/the-dating-game-alan",
    "place/the-dating-game-rock-canyon",
    "lore/the-dating-game-boulder-woman",
  ],
  reviewedBy: ["story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:25:00.000Z",
} as const satisfies StoryTurnPlayed
