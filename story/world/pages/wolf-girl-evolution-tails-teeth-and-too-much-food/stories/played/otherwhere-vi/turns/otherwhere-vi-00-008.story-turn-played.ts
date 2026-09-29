import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00008 = {
  id: "01a0ea86-6270-7c22-bbb4-b3b2a7fbc825",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    'I decide to risk a berry, first looking at it to see if it has a status screen. "Inspect. Appraise. Identify". If not, I eat one and then check my own status screen for effects.',
  lore: [
    "lore/otherwhere-vi-system",
    "place/otherwhere-vi-hollow-stream",
    "lore/otherwhere-vi-nala",
  ],
  endsAt: "2026-09-28T22:36:00.000Z",
} as const satisfies StoryTurnPlayed
