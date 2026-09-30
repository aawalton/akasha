import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00048 = {
  id: "01a0f411-af0d-7634-9931-1dc47e1a8d4f",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-048",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 48,
  stepStatus: "step-status/game-master",
  action:
    "I stay low and let them come, opening my pack for easy access to the bullets, then when they cross 100 meters for accuracy, I start firing aimed shots with full force, rotating across the three closest targets, so I don’t waste shots on downed enemies. I aim for where they are going to be when the rock lands, not where they are.",
  lore: ["lore/overwhere-i-starfall-legacy", "lore/overwhere-i-the-greyfen-alpha"],
} as const satisfies StoryTurnPlayed
