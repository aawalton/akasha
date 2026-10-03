import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00066 = {
  id: "01a0e82b-7ba1-79db-b222-22e4fff95f64",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-066",
  cover: "image/image-67d88ac10565c5cc",
  coverAfter: "Morning finds you rested and whole, the old fullness humming back in",
  ownLength: 118,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 66,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action:
    "**Okay, time for bed.** I go back to my room, take off the robe and slippers, lie down on the bed naked, and go to sleep.",
  beats: "jsonl",
  lore: ["lore/otherwhere-i-golems", "lore/otherwhere-i-universe"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
