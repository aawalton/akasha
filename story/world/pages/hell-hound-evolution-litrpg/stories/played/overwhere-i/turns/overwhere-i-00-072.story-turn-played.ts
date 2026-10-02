import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00072 = {
  id: "01a0fd64-2985-798d-8eb2-ff8de9ffacbd",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-072",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 72,
  stepStatus: "step-status/game-master",
  action:
    "Now that they’ve helpfully put themselves in an enclosed area, I attune Fire and Earth and start superheating the surface stone of the quarry until it starts exploding or melting into lava, slowly working my way closer.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
