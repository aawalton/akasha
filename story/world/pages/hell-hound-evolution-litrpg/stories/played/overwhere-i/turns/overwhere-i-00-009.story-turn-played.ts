import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00009 = {
  id: "01a0f173-d403-7760-ac33-90db1502a161",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 9,
  stepStatus: "step-status/game-master",
  action:
    "“Hello there!  I seem to have gotten a bit lost. Would you mind telling me where we are precisely?”",
  lore: [
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-the-western-march",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-greyfen-ford",
  ],
  endsAt: "2026-09-29T11:07:00.000Z",
} as const satisfies StoryTurnPlayed
