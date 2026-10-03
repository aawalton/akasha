import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00050 = {
  id: "01a0e841-9406-73cd-9d79-6e1229b96c3c",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-050",
  cover: "image/image-9e5a2e846ae3a817",
  coverAfter: "Where the street crests, the whole valley opens out below, Utah Lake",
  ownLength: 90,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 50,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    '"Sounds great. Bye Aelwyn!" I walk back home and get myself some lunch, then go for a walk around my neighborhood again.',
  beats: "jsonl",
  lore: ["place/the-dating-game-apple-avenue"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T13:35:00.000Z",
} as const satisfies StoryTurnPlayed
