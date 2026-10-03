import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00011 = {
  id: "01a0eb57-4a50-73aa-88b9-bbde21524723",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-011",
  cover: "image/image-f5afe2546d989854",
  coverAfter: "You eat on the floor mat by the hearth: bread and hard",
  ownLength: 316,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 11,
  prose: "txt",
  characters: [
    "character-player/otherwhere-xi-nala",
    "world-character/otherwhere-xi-wenna-ashlar",
    "world-character/otherwhere-xi-tobin-ashlar",
    "world-character/otherwhere-xi-smoke",
  ],
  stepStatus: "step-status/player",
  action: "“I might as well for now, it’s good to be needed somewhere.”",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-xi-nala",
    "lore/otherwhere-xi-smoke",
    "lore/otherwhere-xi-tobin-ashlar",
    "lore/otherwhere-xi-wenna-ashlar",
    "place/otherwhere-xi-ashlar-farm",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T12:00:00.000Z",
} as const satisfies StoryTurnPlayed
