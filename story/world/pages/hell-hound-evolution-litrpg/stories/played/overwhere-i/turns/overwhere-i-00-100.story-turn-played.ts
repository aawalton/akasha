import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00100 = {
  id: "01a0ff2a-d3fe-782d-b2c1-4ef28428194e",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-100",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 100,
  stepStatus: "step-status/game-master",
  action: "“I’m Nala, Nala Arthur”",
  lore: ["lore/overwhere-i-the-system-2", "place/overwhere-i-wendlow"],
} as const satisfies StoryTurnPlayed
