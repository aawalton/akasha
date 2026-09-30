import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00019 = {
  id: "01a0f1e3-e153-729e-a8ba-e1c7cda1d60a",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-019",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 19,
  stepStatus: "step-status/game-master",
  action:
    "Since I’m waiting on my boots for another day, I go looking for the grubboars. When I find them, I attune water and use that to hold a sphere of water around the head of each beast to suffocate them",
  lore: ["lore/overwhere-i-greyfen-beasts", "lore/overwhere-i-nala", "place/overwhere-i-fenwatch"],
} as const satisfies StoryTurnPlayed
