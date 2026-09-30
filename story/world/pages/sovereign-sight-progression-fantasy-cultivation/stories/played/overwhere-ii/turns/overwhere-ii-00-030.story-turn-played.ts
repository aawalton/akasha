import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00030 = {
  id: "01a0f366-6de0-7702-9b15-7ab0857da320",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-030",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 30,
  stepStatus: "step-status/game-master",
  action: "I was with Garth and then go present the results to the Reeve",
  lore: [
    "lore/overwhere-ii-garth-marsh",
    "lore/overwhere-ii-keeper-anselm",
    "lore/overwhere-ii-wendle-ford-folk",
    "place/overwhere-ii-wendle-ford",
  ],
  endsAt: "2026-09-30T07:25:00.000Z",
} as const satisfies StoryTurnPlayed
