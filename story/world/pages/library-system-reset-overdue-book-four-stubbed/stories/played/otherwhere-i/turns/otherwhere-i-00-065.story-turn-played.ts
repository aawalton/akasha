import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00065 = {
  id: "01a0e81f-eacb-780f-9733-f45c4e027ae8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-065",
  cover: "image/image-2a762fb9a86487ee",
  coverAfter: "You wind down the spiral staircase into the round chamber, the amber",
  ownLength: 152,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 65,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan"],
  stepStatus: "step-status/player",
  action: "I go back to the basement and sync with the core again.",
  beats: "jsonl",
  lore: ["lore/otherwhere-i-universe"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T18:10:00.000Z",
} as const satisfies StoryTurnPlayed
