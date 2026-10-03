import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00003 = {
  id: "01a0e2f3-f40b-7df7-83f1-a6ec0ec9ab62",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-003",
  cover: "image/image-2dbead74fcc167f7",
  coverAfter: "She swings her legs over the edge of the boulder and slides",
  ownLength: 215,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 3,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  stepStatus: "step-status/player",
  action:
    '"Hi there! Would you be interested in some company? I\'d love someone to chat with on the hike."',
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/the-dating-game-boulder-woman"],
  reviewedBy: ["story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:27:00.000Z",
} as const satisfies StoryTurnPlayed
