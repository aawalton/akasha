import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00009 = {
  id: "01a0e3cd-8508-740e-b386-d537f8a8a974",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 9,
  turnStatus: "turn-status/game-master",
  action:
    "“It’s…beautiful.” I look around with wide eyes, then settle myself. “It sounded like there is work to be done, and some of those error messages downstairs were quite alarming. Where do we start?”",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
