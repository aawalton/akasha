import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00017 = {
  id: "01a0eb52-a9dc-7db9-82a0-b5c198aa2f02",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-017",
  cover: "image/image-493ea53c312c87b6",
  coverAfter: "You hand the shovel to Jory, lift the door-hide, and go in",
  ownLength: 193,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 17,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vi-nala",
    "character-other/otherwhere-vi-jory-tull",
    "character-other/otherwhere-vi-wat",
    "character-other/otherwhere-vi-burr",
  ],
  stepStatus: "step-status/player",
  action: "I go inside to eat.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-charcoal-camp",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-30T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
