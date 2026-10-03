import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00022 = {
  id: "01a0e3cf-51e6-7166-86fe-b3b3cbc26510",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-022",
  cover: "image/image-e205941367c15e09",
  coverAfter: "A breeze comes through and stirs the willows, and a few early",
  ownLength: 119,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 22,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "I continue around the hill, singing quietly to myself as I walk.",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T12:35:00.000Z",
} as const satisfies StoryTurnPlayed
