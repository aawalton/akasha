import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00024 = {
  id: "01a0e3de-dd9d-730f-86df-2d5887b069f4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-024",
  cover: "image/image-e78a78c6b1bb2ba9",
  coverAfter: "She looks twenty-two. Her hair is long and straight and near-black, parted",
  ownLength: 178,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 24,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "Rather than go home, I’m feeling social still, so I go for a walk around my neighborhood instead",
  beats: "jsonl",
  lore: ["lore/the-dating-game-grace"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T17:03:00.000Z",
} as const satisfies StoryTurnPlayed
