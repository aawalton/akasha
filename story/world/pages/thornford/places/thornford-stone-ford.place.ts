import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordStoneFord = {
  id: "01a14b65-1e22-716f-a809-757d25d4d42a",
  type: "page-type/place",
  slug: "thornford-stone-ford",
  title: "The Stone Ford",
  world: "world/thornford",
  within: "place/thornford-town",
  facts: [
    {
      fact: "A stone ford crosses the river Elt at Thornford.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "On the quarter days the border between the valley and the fae country thins at the ford.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "On the quarter days the fae courts come across the ford to trade.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
  ],
  createdAt: "2026-10-17T19:44:40.481Z",
  updatedAt: "2026-10-17T19:44:40.481Z",
} as const satisfies Place
