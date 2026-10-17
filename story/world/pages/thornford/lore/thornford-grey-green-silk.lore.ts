import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordGreyGreenSilk = {
  id: "01a14b76-9919-75ea-807d-90a0fe16d809",
  type: "page-type/lore",
  slug: "thornford-grey-green-silk",
  title: "The Grey-Green Silk",
  world: "world/thornford",
  about: "story-item/thornford-grey-green-silk",
  facts: [
    {
      fact: "The grey-green silk was woven in the Spring Court, across the ford.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "The silk shifts between grey and green as it moves, like new leaves in rain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/thornford-shaestrel",
        "character-player/thornford-nala",
      ],
    },
    {
      fact: "The bolt holds enough silk for one gown, with about an arm's length to spare.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/thornford-shaestrel",
        "character-player/thornford-nala",
      ],
    },
    {
      fact: "The silk takes an iron's heat without a mark.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Nala cut the gown's pieces from the silk on the night of April 29, with Shaestrel watching.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
  ],
  createdAt: "2026-10-17T20:03:46.072Z",
  updatedAt: "2026-10-17T21:53:16.097Z",
} as const satisfies Lore
