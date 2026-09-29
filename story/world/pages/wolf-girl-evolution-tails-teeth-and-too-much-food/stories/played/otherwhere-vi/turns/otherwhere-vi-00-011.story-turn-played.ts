import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00011 = {
  id: "01a0eaca-46b4-7c9c-8eb7-446b4b1504b1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 11,
  stepStatus: "step-status/game-master",
  action:
    '"Great. The system isn\'t just useless, it also has an attitude. I would have used a roof if there was one!" I shout to the sky. I get up and use the stick to support myself and make my way downstream as best I can, hoping to find help or healing before I die of exposure.',
  lore: ["place/otherwhere-vi-charcoal-camp", "lore/otherwhere-vi-nala"],
  endsAt: "2026-09-29T10:10:00.000Z",
} as const satisfies StoryTurnPlayed
