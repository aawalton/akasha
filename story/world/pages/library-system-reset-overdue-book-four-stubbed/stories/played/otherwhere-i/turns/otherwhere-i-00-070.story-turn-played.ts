import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00070 = {
  id: "01a0e930-9268-7437-8b3f-8e03e2500a0c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-070",
  cover: "image/image-c09e51f2aea27d0a",
  coverAfter: "A pause, the kind he takes when his eyes flicker blue and",
  ownLength: 170,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 70,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action:
    "**Okay, let the work, I'd like you to identify books we've found that I should read to prepare for the opening**",
  beats: "jsonl",
  lore: ["place/otherwhere-i-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:39:00.000Z",
} as const satisfies StoryTurnPlayed
