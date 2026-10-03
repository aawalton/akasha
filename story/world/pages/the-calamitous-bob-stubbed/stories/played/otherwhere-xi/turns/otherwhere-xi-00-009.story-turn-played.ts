import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00009 = {
  id: "01a0eb1a-a146-72b6-81e8-e911d58c6b77",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-009",
  cover: "image/image-7206b29361de76d7",
  coverAfter: "Then she looks at your hands, holding the ewe's head. Small. Pale.",
  ownLength: 295,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 9,
  prose: "txt",
  characters: ["character-player/otherwhere-xi-nala", "world-character/otherwhere-xi-wenna-ashlar"],
  stepStatus: "step-status/player",
  action: "I watch carefully, learn, and work as I can.",
  beats: "jsonl",
  lore: [
    "lore/otherwhere-xi-nala",
    "lore/otherwhere-xi-wenna-ashlar",
    "place/otherwhere-xi-ashlar-farm",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T09:09:00.000Z",
} as const satisfies StoryTurnPlayed
