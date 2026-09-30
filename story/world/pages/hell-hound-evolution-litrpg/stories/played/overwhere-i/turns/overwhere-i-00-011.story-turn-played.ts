import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00011 = {
  id: "01a0f185-1cc6-7776-8662-1f0fac404749",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 11,
  stepStatus: "step-status/game-master",
  action:
    "“Nala.” I stand up and wander over. “Mind if I watch? I’ve never seen a beast skinned and quartered before.”",
  lore: [
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-sootjaw",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-greyfen-ford",
  ],
} as const satisfies StoryTurnPlayed
