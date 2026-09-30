import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00047 = {
  id: "01a0f405-2654-7b12-9052-82e3c55274f7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-047",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 47,
  stepStatus: "step-status/game-master",
  action:
    "I get out of sight and cover myself in the muck to mask my scent, then careful circle around to the closest cover and get as close as I can without being detected.",
  lore: ["lore/overwhere-i-the-greyfen-alpha", "place/overwhere-i-the-greyfen"],
} as const satisfies StoryTurnPlayed
