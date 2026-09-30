import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00028 = {
  id: "01a0f342-bd02-794d-b0e8-8005c01008f3",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-028",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 28,
  stepStatus: "step-status/game-master",
  action:
    "“Hmm, could you show me the holes? I’d like to try killing them in the daylight first. I think I can get them even where they are hiding if I know where they are. I’d don’t really want to wait until nighttime, that feels like forever away.” I say with a grin.",
  lore: [
    "lore/overwhere-i-greyfen-beasts",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-greyback-and-east-road",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
