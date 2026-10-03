import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00011 = {
  id: "01a0ea93-53e7-7b10-bc82-f8c34fd26d6b",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-011",
  cover: "image/image-42aa0937c5bbd582",
  coverAfter: "You hold the three sticks to the little flame until their tips",
  ownLength: 328,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 11,
  prose: "txt",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-zhao-jun"],
  stepStatus: "step-status/player",
  action:
    'I light the incense and speak calmly and clearly, so the crowd can hear, saying "Old Grandfather of the Three Stones. Your people respect the old ways and honor their ancestors as they have for many years. May they be safe and prosper that they may continue to do so for many more."',
  beats: "jsonl",
  lore: ["lore/otherwhere-iv-earth-god-shrine"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T19:09:00.000Z",
} as const satisfies StoryTurnPlayed
