import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00015 = {
  id: "01a0e36a-84cc-7c62-b363-11e3a57defe3",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-015",
  cover: "image/image-ee04d919c9651046",
  coverAfter: "She holds her open palm out to you, flat, and lifts her",
  ownLength: 118,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 15,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    '"You think you could do it? I\'d love a partner on this. Can you make a voice after reading the text without hearing it first?"',
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/the-dating-game-echo"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:59:00.000Z",
} as const satisfies StoryTurnPlayed
