import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00008 = {
  id: "01a0ea94-50c5-7d91-a45d-46deab30f705",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-008",
  cover: "image/image-ee4aa03f64c3806b",
  coverAfter: "When your sight clears, your hands are shaking badly, and your leg",
  ownLength: 120,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 8,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action: "I grab another glass shard and stab it again",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T15:39:00.000Z",
} as const satisfies StoryTurnPlayed
