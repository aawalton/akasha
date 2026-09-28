import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00002 = {
  id: "01a0ea1f-d870-755a-a4ff-7417b35658e0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 2,
  stepStatus: "step-status/game-master",
  action:
    '"Okay" I say quietly to myself. "This is definitely not Earth. Isekai protocol. System? Status? Character Sheet? Menu?" I focus on myself and see if anything comes up.',
  lore: ["lore/otherwhere-vi-system", "lore/otherwhere-vi-nala"],
} as const satisfies StoryTurnPlayed
