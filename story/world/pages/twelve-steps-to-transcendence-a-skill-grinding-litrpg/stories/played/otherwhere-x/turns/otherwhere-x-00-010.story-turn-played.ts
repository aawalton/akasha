import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00010 = {
  id: "01a0eb2b-6ea5-7819-8b72-e87a5780f225",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 10,
  stepStatus: "step-status/game-master",
  action:
    '"I told you I come from far away, far enough that the tongue of Sulon is not the only tongue. I\'m fluent in a few tongues and can understand several more."',
  lore: [
    "lore/otherwhere-x-aldous-crane",
    "lore/otherwhere-x-language",
    "lore/otherwhere-x-martha-deane",
    "lore/otherwhere-x-nala",
    "lore/otherwhere-x-regional-walls",
    "lore/otherwhere-x-resolution",
    "lore/otherwhere-x-skinwalker",
    "lore/otherwhere-x-standing",
    "lore/otherwhere-x-the-wider-world",
    "lore/otherwhere-x-time",
    "place/otherwhere-x-the-sheaf",
  ],
} as const satisfies StoryTurnPlayed
