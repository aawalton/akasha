import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherGuildHall2 = {
  id: "01a11382-5b0d-742a-9175-b7ef19daf318",
  type: "page-type/lore",
  slug: "fairweather-guild-hall-2",
  title: "The Guild Hall, continued",
  world: "world/fairweather",
  about: "place/fairweather-guild-hall",
  facts: [
    {
      fact: "The guild hall shuts at noon on Midsummer, for the festival.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
  ],
  createdAt: "2026-10-06T23:17:52.525Z",
  updatedAt: "2026-10-06T23:17:53.000Z",
} as const satisfies Lore
