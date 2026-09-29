import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00012 = {
  id: "01a0eae9-ea7f-77f5-9022-25ac838555da",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 12,
  stepStatus: "step-status/game-master",
  action:
    "\"Hello! I've been lost in the woods for a night and a day, would you grant me a traveler's hospitality?\"",
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-charcoal-camp",
  ],
  endsAt: "2026-09-29T11:15:00.000Z",
} as const satisfies StoryTurnPlayed
