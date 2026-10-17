import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordNalasShop = {
  id: "01a14b65-1e21-73e3-b96d-59d03b1fab00",
  type: "page-type/place",
  slug: "thornford-nalas-shop",
  title: "Nala's Shop",
  world: "world/thornford",
  within: "place/thornford-weavers-row",
  facts: [
    {
      fact: "Nala rents a narrow shop on Weavers' Row.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "The shop has a cutting table, a treadle machine and a back room Nala sleeps in.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Nala is behind on the rent for the shop.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The quarter's rent for the shop falls due on Beltane.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Morag Bain, who owns the building, keeps a key to the shop.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
  ],
  createdAt: "2026-10-17T19:44:40.481Z",
  updatedAt: "2026-10-17T20:10:46.816Z",
} as const satisfies Place
