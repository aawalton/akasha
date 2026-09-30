import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00009 = {
  id: "01a0f1a0-608f-78f4-928c-c5454d926ad6",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 9,
  stepStatus: "step-status/game-master",
  action:
    "I go in. “Do I need to register to take on a task from the board or can I just return when it is complete? I’m looking at gathering frostcap mushrooms. Also, anything you could tell me about them or the area where they are found would be appreciated.”",
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "place/overwhere-iii-wrenwood",
  ],
} as const satisfies StoryTurnPlayed
