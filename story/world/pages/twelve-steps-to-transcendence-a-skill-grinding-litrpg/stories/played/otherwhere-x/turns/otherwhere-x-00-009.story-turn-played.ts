import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00009 = {
  id: "01a0eb19-e85e-7215-b051-d2c447a3d16f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 9,
  stepStatus: "step-status/game-master",
  action:
    'I sing "Dulaman" as a third one in the Celtic tradition, this time I test and deliberately try to sing in the original language, since I don\'t understand the words anyways. When I\'m done, I answer the question. "I\'ve been singing off and on for basically my whole life, just comes naturally. These are popular songs where I am from, but that is far, far away."',
  lore: [
    "lore/otherwhere-x-aldous-crane",
    "lore/otherwhere-x-language",
    "lore/otherwhere-x-martha-deane",
    "lore/otherwhere-x-nala",
    "lore/otherwhere-x-progression",
    "lore/otherwhere-x-resolution",
    "lore/otherwhere-x-skinwalker",
    "lore/otherwhere-x-standing",
    "lore/otherwhere-x-the-wider-world",
    "lore/otherwhere-x-time",
    "place/otherwhere-x-the-sheaf",
  ],
} as const satisfies StoryTurnPlayed
