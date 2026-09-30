import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00003 = {
  id: "01a0f12e-73bf-737d-a1a8-653cc876e073",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "“Oh, perfect! A test subject!” I point a finger at the creature and focus on attuning to fire, imaging a narrow beam of intense flame extending from my finger through the creature.",
  lore: [
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-sootjaw",
    "lore/overwhere-i-the-system",
    "place/overwhere-i-greyfen-ford",
  ],
} as const satisfies StoryTurnPlayed
