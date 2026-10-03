import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00013 = {
  id: "01a0e359-c3c0-7e44-b134-fe170c2c085d",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-013",
  cover: "image/image-fad64d651d728531",
  coverAfter: "Then she shows you. She runs through a handful of them, one",
  ownLength: 252,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 13,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Really? I've read the first six books there, but I can't understand why they're so popular. What do you like about it? I've gotta go with The Wandering Inn. I mean, 16 million words and it still is constantly surprising me, nothing else I've read even comes close.\"",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:56:00.000Z",
} as const satisfies StoryTurnPlayed
