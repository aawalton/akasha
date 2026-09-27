import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00026 = {
  id: "01a0e4fa-9abc-7486-89b7-a3035c2af69a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-026",
  cover: "image/image-da31dcd3a85de604",
  ownLength: 114,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 26,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/player",
  action: "“Links, is the big one the last one, or are there more?”",
  beats: [
    "Still lying across the dried coil, Nala calls out to Links, asking if the big one is the last.",
    "Links pads up to the edge of the broken oval, stripes crawling, eyes flickering blue as he searches.",
    '"Two more small ones, and the big one," he says sharply. "Three down. Half done. The easy half."',
    "His too-large eyes drop to her dripping left sleeve and stay there a moment.",
    '"You\'re bleeding on my floor," he says, but it comes out quieter than the rest.',
  ],
  issues: [
    '"Still kneeling on the dried coil" - in 025 she lies across the coil, pinning it with her weight',
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
