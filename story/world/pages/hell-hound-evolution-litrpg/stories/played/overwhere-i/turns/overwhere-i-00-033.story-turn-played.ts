import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00033 = {
  id: "01a0f371-0d60-7371-84be-50bfcc54a66c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-033",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 33,
  stepStatus: "step-status/game-master",
  action: "I hit it again with fire and air, blowing it away from the water.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-09-30T10:53:00.000Z",
} as const satisfies StoryTurnPlayed
