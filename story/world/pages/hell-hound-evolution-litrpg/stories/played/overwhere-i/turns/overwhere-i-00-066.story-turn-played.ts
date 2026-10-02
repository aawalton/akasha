import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00066 = {
  id: "01a0fd18-f41b-7fc8-b3dd-f4e716627a82",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-066",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 66,
  stepStatus: "step-status/game-master",
  action:
    "“How far to Wendlow again? I’d love to get this turned in and paid for before it stinks too much.”",
  lore: [
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-osric-fenn",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
