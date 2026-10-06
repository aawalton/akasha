import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherCora2 = {
  id: "01a11314-927b-7e67-8c29-a0c43bd7ae7d",
  type: "page-type/lore",
  slug: "fairweather-cora-2",
  title: "Cora, continued",
  world: "world/fairweather",
  about: "character-other/fairweather-cora",
  facts: [
    {
      fact: "Cora's grandmother lives on Lantern Square, and has lit five candles each night for sixty years.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "At the Memorial of Strings Cora held Elsie's hand tight.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Cora told Elsie the five threads are not why she said, Don't do that again.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Cora asked Elsie whose fingers the second grey glove is measured for.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Cora will be at the Lantern Steps at dusk on the twentieth, with her lantern.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
  ],
} as const satisfies Lore
