import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00014 = {
  id: "01a0eb32-5866-74eb-be3d-44b2807b30db",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-014",
  cover: "image/image-3dd8dd08935a3b69",
  coverAfter: "As it reaches you, you drive the right-hand quill at its face,",
  ownLength: 230,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 14,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "I hold a quill in each hand and crouch low to the ground, keeping an eye on both the beast approaching on the ground and the one in the sky. If one comes close, I'll aim to stab into the belly or eyes depending on what is accessible.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-ix-carrion-hawk",
    "lore/otherwhere-ix-nala",
    "lore/otherwhere-ix-shardback",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T15:57:00.000Z",
} as const satisfies StoryTurnPlayed
