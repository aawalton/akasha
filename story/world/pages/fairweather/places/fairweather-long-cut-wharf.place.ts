import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherLongCutWharf = {
  id: "01a1070c-377e-77fd-9580-aab6251a3916",
  type: "page-type/place",
  slug: "fairweather-long-cut-wharf",
  title: "The Long Cut Coal Wharf",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  cover: "image/image-8730538525d4f995",
  facts: [
    {
      fact: "The Long Cut coal wharf is a stone quay heaped with coal, where barges moor nose to tail.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "A lock with heavy black gates holds the Long Cut at the wharf's end, and a crane leans by it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "A brick wharf office by the lock takes messages and coin for the barge folk.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-tamsin"],
    },
  ],
} as const satisfies Place
