import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00048 = {
  id: "01a0f7da-50fe-76e4-a168-8883fecfa965",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-048",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 48,
  stepStatus: "step-status/game-master",
  action: "I go out to the shrine and try resting there for a while",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-magic",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
  endsAt: "2026-10-03T15:35:00.000Z",
} as const satisfies StoryTurnPlayed
