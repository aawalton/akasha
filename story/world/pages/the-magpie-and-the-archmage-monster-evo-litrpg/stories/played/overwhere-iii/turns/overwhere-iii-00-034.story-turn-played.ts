import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00034 = {
  id: "01a0f3af-e2cf-7052-80d1-df4d741bcd1f",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-034",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 34,
  stepStatus: "step-status/game-master",
  action:
    "Since I have enough money for another night or two, I decide to focus on physical exercise, running laps around the village and doing body weight exercises until my mana refills, then go to heal Garrick again.",
  lore: [
    "lore/overwhere-iii-garrick-dole",
    "lore/overwhere-iii-maud-ferrow",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate",
  ],
} as const satisfies StoryTurnPlayed
