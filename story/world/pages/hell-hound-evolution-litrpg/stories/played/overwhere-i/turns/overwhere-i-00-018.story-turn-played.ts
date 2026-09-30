import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00018 = {
  id: "01a0f1d9-0f4b-7721-961b-34be94117c5c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-018",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 18,
  stepStatus: "step-status/game-master",
  action:
    "After a good night sleep, I go looking for the bounty board to get the list of potential targets from the source.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "place/overwhere-i-fenwatch",
  ],
} as const satisfies StoryTurnPlayed
