import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00093 = {
  id: "01a0feb9-8675-7524-b23c-e66b52c39dd3",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-093",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 93,
  stepStatus: "step-status/game-master",
  action:
    "Sleep and then accelerate the journey the next day, lightening and accelerating the cart and mule",
  lore: [
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-starfall-legacy-2",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
