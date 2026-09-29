import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00013 = {
  id: "01a0eb01-899a-735a-a330-9846fd721223",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-013",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 13,
  stepStatus: "step-status/game-master",
  action:
    '"I\'m Nala, I\'m from very far away and not entirely sure how I got here, or where even "here" is. Could you help me get oriented?"',
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-charcoal-camp",
    "place/otherwhere-vi-greypine-weald",
  ],
  endsAt: "2026-09-29T12:15:00.000Z",
} as const satisfies StoryTurnPlayed
