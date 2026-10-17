import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordTown = {
  id: "01a14b65-1e22-7ee7-a455-3f5cd6ec60a8",
  type: "page-type/place",
  slug: "thornford-town",
  title: "Thornford",
  world: "world/thornford",
  facts: [
    {
      fact: "Thornford is a market town in a Highland valley, on the river Elt.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The town's dressmakers' guild is jealous of its trade.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Someone in Thornford wants the Spring Court to look foolish at the Beltane dance.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-17T19:44:40.481Z",
  updatedAt: "2026-10-17T19:44:40.481Z",
} as const satisfies Place
