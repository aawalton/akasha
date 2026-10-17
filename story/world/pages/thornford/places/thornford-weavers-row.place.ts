import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordWeaversRow = {
  id: "01a14b75-c08f-7c13-96c5-47cd3d3b2d13",
  type: "page-type/place",
  slug: "thornford-weavers-row",
  title: "Weavers' Row",
  world: "world/thornford",
  within: "place/thornford-town",
  facts: [
    {
      fact: "Weavers' Row is a steep cobbled lane of narrow shops from the market cross down to the river.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The guild dressmakers keep the wide shops at the top of the Row, by the market cross.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "The small rented shops lie at the river end of the Row, a short walk from the stone ford.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
  ],
  createdAt: "2026-10-17T20:02:50.638Z",
  updatedAt: "2026-10-17T20:02:50.638Z",
} as const satisfies Place
