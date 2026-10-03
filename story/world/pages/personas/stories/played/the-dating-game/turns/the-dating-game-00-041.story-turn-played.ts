import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00041 = {
  id: "01a0e807-ac72-7edc-9d3f-e9476f896a1a",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-041",
  cover: "image/image-f1f1c0d4c970a456",
  coverAfter: "She tucks a loose strand of hair behind one long pointed ear,",
  ownLength: 147,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 41,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "\"Hi there! I'm Alan, isn't this a great place to get some exercise and fresh air?\"",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
  endsAt: "2026-09-27T10:12:00.000Z",
} as const satisfies StoryTurnPlayed
