import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00086 = {
  id: "01a0fe58-89cb-76dd-a089-e31491d780eb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-086",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 86,
  stepStatus: "step-status/game-master",
  action:
    "I use a spinning water blade to cut off his head, search his person for anything of value, put it in the sack and start retracing my steps back to each of the places I killed his men, collecting their valuables in the sack as well and cutting off their ears for proof of the kills.",
  lore: [
    "lore/overwhere-i-ivo-tessaly",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
    "lore/overwhere-i-the-deserter-crew-2-2-2",
    "place/overwhere-i-greyback-and-east-road",
    "place/overwhere-i-wendlow",
  ],
} as const satisfies StoryTurnPlayed
