import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00046 = {
  id: "01a0f3fb-6d6f-7046-a7b1-d8a4f04b4ab9",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-046",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 46,
  stepStatus: "step-status/game-master",
  action:
    "I use my lenses to scout the camp again, counting to see if all of the wolves are accounted for and estimating distances.",
  lore: ["lore/overwhere-i-the-greyfen-alpha", "place/overwhere-i-the-greyfen"],
  endsAt: "2026-10-01T12:36:00.000Z",
} as const satisfies StoryTurnPlayed
