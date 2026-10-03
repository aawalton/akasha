import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00016 = {
  id: "01a0eb30-2183-7d50-88a0-6c769169c042",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-016",
  cover: "image/image-88058eefc0f86d2a",
  coverAfter: "A red glow shows through the turf, low down, the size of",
  ownLength: 373,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 16,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vi-nala",
    "character-other/otherwhere-vi-jory-tull",
    "character-other/otherwhere-vi-wat",
    "character-other/otherwhere-vi-burr",
  ],
  stepStatus: "step-status/player",
  action: "I check my status to see if the sleep recovered any HP, then focus on my task.",
  beats: "jsonl",
  lore: ["lore/otherwhere-vi-nala", "place/otherwhere-vi-charcoal-camp"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-30T06:10:00.000Z",
} as const satisfies StoryTurnPlayed
