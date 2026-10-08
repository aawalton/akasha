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
      fact: "Elsie's party signed for the Midsummer barge guard on the eighteenth, stamped for the twentieth.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "On the nineteenth Noor Haddad was written in as a fourth name on the barge guard.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
        "character-other/fairweather-noor",
      ],
    },
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
  updatedAt: "2026-10-08T16:25:27.646Z",
} as const satisfies Lore
