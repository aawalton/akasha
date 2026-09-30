import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00012 = {
  id: "01a0f18e-6b55-7ca6-a1ca-414828bd1335",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 12,
  stepStatus: "step-status/game-master",
  action:
    "“Oh, here and there. A bit of a rolling stone, always looking for a change and a challenge. Any good challenges near here?”",
  lore: [
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-the-deserter-crew",
    "lore/overwhere-i-the-greyfen-alpha",
    "place/overwhere-i-greyfen-ford",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
