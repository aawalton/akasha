import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordBeltaneGreen = {
  id: "01a14bf2-14e8-7b43-b46f-f2d1303c8535",
  type: "page-type/place",
  slug: "thornford-beltane-green",
  title: "The Beltane Green",
  world: "world/thornford",
  within: "place/thornford-fae-country",
  facts: [
    {
      fact: "The Spring Court dances Beltane on a wide green ringed by birches, a short walk from the far bank.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Fires burn round the edge of the green, and long tables there hold fae food and wine.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Every court comes to the green at Beltane to watch the Spring Court hand on the year.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
  ],
  createdAt: "2026-10-17T22:18:38.695Z",
  updatedAt: "2026-10-17T22:18:38.695Z",
} as const satisfies Place
