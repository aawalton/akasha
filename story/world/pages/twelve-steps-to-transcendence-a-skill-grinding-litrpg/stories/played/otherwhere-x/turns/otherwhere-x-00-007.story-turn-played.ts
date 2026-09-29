import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00007 = {
  id: "01a0ead2-7139-7565-ac03-627e5aab15f6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    "\"I truly don't know. Some magic brought me hear beyond my understanding. I'm hoping learning more about your world will help me understand. What is the name of the kingdom? Who is the king? What is said of magic and monsters in the world at large?\"",
  lore: [
    "lore/otherwhere-x-osric",
    "lore/otherwhere-x-the-wider-world",
    "place/otherwhere-x-sulon-capital",
  ],
} as const satisfies StoryTurnPlayed
