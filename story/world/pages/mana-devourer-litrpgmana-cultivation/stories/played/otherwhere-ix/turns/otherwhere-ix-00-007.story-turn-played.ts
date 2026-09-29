import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00007 = {
  id: "01a0ea8a-9a5c-774e-980c-a31905500d44",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    "\"Firrelia System, if you have a unique trait waiting for me, now is the time, otherwise you'll have lost your chance.\" I grab at the glass and try to stab it into the beast's throat.",
  lore: ["lore/otherwhere-ix-shardback", "lore/otherwhere-ix-nala"],
} as const satisfies StoryTurnPlayed
