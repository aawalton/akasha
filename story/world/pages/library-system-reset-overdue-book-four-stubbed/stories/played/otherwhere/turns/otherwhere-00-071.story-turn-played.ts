import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00071 = {
  id: "01a0e948-cd15-78cb-b953-8e9dc8bc0d1f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-071",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 71,
  turnStatus: "turn-status/game-master",
  action:
    "**No book that will let me cast a spell to read a book? I'm a speed reader (4000 WPM), so I can read fast, but I'm sure magic could make that faster.** I got and collect the two books and sit down to read them.",
  lore: [
    "lore/otherwhere-universe",
    "lore/otherwhere-peoples",
    "lore/otherwhere-alan",
    "place/otherwhere-main-hall",
  ],
} as const satisfies StoryTurnPlayed
