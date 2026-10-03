import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00014 = {
  id: "01a0eb13-30c5-74b2-a781-dedc57aee5f4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-014",
  cover: "image/image-23df81eb0cfaadc8",
  coverAfter: 'Wat looks at you across the fire. "Can you sit awake in',
  ownLength: 323,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 14,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vi-nala",
    "character-other/otherwhere-vi-jory-tull",
    "character-other/otherwhere-vi-wat",
    "character-other/otherwhere-vi-burr",
  ],
  stepStatus: "step-status/player",
  action:
    '"No one is hunting me, but I am owned by no village either, which means the village maybe not be safe for me. Are there other options for healing? If I increase my level or stats, would that be enough?"',
  beats: "jsonl",
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-brackenford",
    "place/otherwhere-vi-charcoal-camp",
    "place/otherwhere-vi-wenmarch",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-29T12:35:00.000Z",
} as const satisfies StoryTurnPlayed
