import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00021 = {
  id: "01a0f1ff-2439-7a0c-babe-4c8841a9344b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-021",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 21,
  stepStatus: "step-status/game-master",
  action:
    "I weave fire into my muscles for strength, grab the boar by the tusks, and drag him back to the village.",
  lore: ["lore/overwhere-i-greyfen-beasts", "lore/overwhere-i-nala", "place/overwhere-i-fenwatch"],
  endsAt: "2026-09-30T07:44:00.000Z",
} as const satisfies StoryTurnPlayed
