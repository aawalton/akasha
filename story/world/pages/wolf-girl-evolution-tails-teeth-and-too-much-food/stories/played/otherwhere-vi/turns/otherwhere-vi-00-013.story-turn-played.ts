import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00013 = {
  id: "01a0eb01-899a-735a-a330-9846fd721223",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-013",
  cover: "image/image-f1405c64a761f82b",
  coverAfter: "The old man spits into the fire and looks at you across",
  ownLength: 369,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 13,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vi-nala",
    "character-other/otherwhere-vi-jory-tull",
    "character-other/otherwhere-vi-wat",
    "character-other/otherwhere-vi-burr",
  ],
  stepStatus: "step-status/player",
  action:
    '"I\'m Nala, I\'m from very far away and not entirely sure how I got here, or where even "here" is. Could you help me get oriented?"',
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-brackenford",
    "place/otherwhere-vi-charcoal-camp",
    "place/otherwhere-vi-greypine-weald",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-29T12:15:00.000Z",
} as const satisfies StoryTurnPlayed
