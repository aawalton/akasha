import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00061 = {
  id: "01a0fd32-6e6b-7f39-84d8-c9f2af125d16",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-061",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 61,
  stepStatus: "step-status/game-master",
  action:
    "I pick up my commissioned spear from Hob and check with Anselm on the next steps for my refining",
  lore: [
    "lore/overwhere-ii-keeper-anselm-2",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "place/overwhere-ii-tarrant-smithy",
  ],
  endsAt: "2026-10-07T07:50:00.000Z",
} as const satisfies StoryTurnPlayed
