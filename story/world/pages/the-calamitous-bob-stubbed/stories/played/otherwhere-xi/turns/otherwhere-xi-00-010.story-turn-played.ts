import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00010 = {
  id: "01a0eb2c-8f4c-7891-8ca6-9349db92cca1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-010",
  cover: "image/image-c6b21a478ef674c5",
  coverAfter: "The woman sits back on her heels. She looks at your arm,",
  ownLength: 381,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 10,
  prose: "txt",
  characters: ["character-player/otherwhere-xi-nala", "character-other/otherwhere-xi-wenna-ashlar"],
  stepStatus: "step-status/player",
  action:
    "I do my best to follow instructions and save the lamb and the ewe, praying in my heart for a healer path as a sign for why I was brought to this land.",
  beats: "jsonl",
  lore: [
    "lore/otherwhere-xi-farming",
    "lore/otherwhere-xi-nala",
    "lore/otherwhere-xi-wenna-ashlar",
    "place/otherwhere-xi-ashlar-farm",
    "place/otherwhere-xi-tavelford",
    "place/otherwhere-xi-waystone-shrine",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T09:34:00.000Z",
} as const satisfies StoryTurnPlayed
