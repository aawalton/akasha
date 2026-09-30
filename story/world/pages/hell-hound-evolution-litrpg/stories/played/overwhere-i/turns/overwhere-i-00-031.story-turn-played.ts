import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00031 = {
  id: "01a0f35e-314b-7ff4-8409-890e816f0c43",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-031",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 31,
  stepStatus: "step-status/game-master",
  action: "I attune water where the bubbles are and see I can grab the creature and pull it free.",
  lore: [
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-09-30T10:51:00.000Z",
} as const satisfies StoryTurnPlayed
