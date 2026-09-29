import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00010 = {
  id: "01a0eaa4-c83f-7cda-a09e-6bd43828aa6a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 10,
  stepStatus: "step-status/game-master",
  action:
    "I try to find some degree of shelter, even a bush if possible, and then fall asleep, hoping to wake again.",
  lore: ["place/otherwhere-vi-cowberry-bank", "lore/otherwhere-vi-nala"],
  endsAt: "2026-09-29T06:10:00.000Z",
} as const satisfies StoryTurnPlayed
