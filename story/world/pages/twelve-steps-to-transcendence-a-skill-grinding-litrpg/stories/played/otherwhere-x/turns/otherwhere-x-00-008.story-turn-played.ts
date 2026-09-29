import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00008 = {
  id: "01a0eaf5-1ab9-7092-a4e9-1303fbe3f93e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    'I choose to sing "O Danny Boy", since I don\'t know if they will understand the words, but the emotions can still come through the music. After that I sing "Homeward Bound"',
  lore: [
    "lore/otherwhere-x-aldous-crane",
    "lore/otherwhere-x-language",
    "lore/otherwhere-x-martha-deane",
    "lore/otherwhere-x-nala",
    "lore/otherwhere-x-progression",
    "lore/otherwhere-x-resolution",
    "lore/otherwhere-x-standing",
    "lore/otherwhere-x-survival",
    "lore/otherwhere-x-time",
    "place/otherwhere-x-harrow",
    "place/otherwhere-x-harrow-green",
    "place/otherwhere-x-the-sheaf",
  ],
  endsAt: "2026-09-28T19:13:00.000Z",
} as const satisfies StoryTurnPlayed
