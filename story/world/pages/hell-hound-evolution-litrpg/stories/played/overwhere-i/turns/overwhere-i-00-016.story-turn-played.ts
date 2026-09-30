import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00016 = {
  id: "01a0f1bf-7847-7acc-b335-6ec3d26192de",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-016",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 16,
  stepStatus: "step-status/game-master",
  action:
    "I see if I can take care of any of my errands before the feast, otherwise I’ll do them in the morning.",
  lore: [
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-fenwatch",
  ],
  endsAt: "2026-09-29T18:50:00.000Z",
} as const satisfies StoryTurnPlayed
