import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00015 = {
  id: "01a0eb1e-9f9a-7154-b130-3089a2357364",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-015",
  cover: "image/image-9ef01adc6c4e4eb7",
  coverAfter: "The great moon comes up over the river, huge and round and",
  ownLength: 361,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 15,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vi-nala",
    "character-other/otherwhere-vi-jory-tull",
    "character-other/otherwhere-vi-wat",
    "character-other/otherwhere-vi-burr",
  ],
  stepStatus: "step-status/player",
  action:
    '"Yes, I made it through a night in the forest alone. I know enough to fear the dark, but I can be afraid without panic."',
  beats: "jsonl",
  lore: ["lore/otherwhere-vi-nala", "place/otherwhere-vi-charcoal-camp"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T20:00:00.000Z",
} as const satisfies StoryTurnPlayed
