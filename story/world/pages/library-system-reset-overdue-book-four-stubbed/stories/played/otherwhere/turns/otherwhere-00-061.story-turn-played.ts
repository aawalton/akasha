import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00061 = {
  id: "01a0e7fe-9523-7ffc-8df5-56b9ae1779fe",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-061",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 61,
  turnStatus: "turn-status/game-master",
  action:
    "**Okay Links, what do I need to do the restore the check-in counter? Also, are there any global taboos I need to know about? From seeing the past patrons, I'm assuming the cultures here are more diverse than what I'm use to.**",
  lore: ["lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
