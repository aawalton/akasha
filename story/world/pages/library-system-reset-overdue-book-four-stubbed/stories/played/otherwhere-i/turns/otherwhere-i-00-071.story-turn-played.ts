import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00071 = {
  id: "01a0e948-cd15-78cb-b953-8e9dc8bc0d1f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-071",
  cover: "image/image-7de060c86d9588e0",
  coverAfter: "Then you roll one of the hall's tall ladders along its brass",
  ownLength: 382,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 71,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action:
    "**No book that will let me cast a spell to read a book? I'm a speed reader (4000 WPM), so I can read fast, but I'm sure magic could make that faster.** I got and collect the two books and sit down to read them.",
  beats: "jsonl",
  issues: [
    '"It hasn\'t taken" - Links set Counter Keeping to read now; grasped whole, a book grants its power',
  ],
  lore: [
    "lore/otherwhere-i-universe",
    "lore/otherwhere-i-peoples",
    "lore/otherwhere-i-alan",
    "place/otherwhere-i-main-hall",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-29T11:52:00.000Z",
} as const satisfies StoryTurnPlayed
