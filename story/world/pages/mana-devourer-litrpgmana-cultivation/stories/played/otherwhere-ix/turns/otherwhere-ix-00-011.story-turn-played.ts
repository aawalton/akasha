import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00011 = {
  id: "01a0ead0-a74d-7add-b508-bdc2c4840c8c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-011",
  cover: "image/image-80867173a7dd3a38",
  coverAfter: "The sun is well past its height, and the afternoon is still",
  ownLength: 183,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 11,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action: '"Okay, I put all 24 stat points into Consitutation."',
  beats: "jsonl",
  issues: [
    '"The sun stands low in the west, and the heat has gone out of the air" - 15:45, hours before dusk',
  ],
  lore: [
    "lore/otherwhere-ix-beast-cores",
    "lore/otherwhere-ix-nala",
    "lore/otherwhere-ix-stat-points",
    "lore/otherwhere-ix-survival",
    "place/otherwhere-ix-glassgrass-flats",
    "place/otherwhere-ix-tinleaf-seep",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T15:45:00.000Z",
} as const satisfies StoryTurnPlayed
