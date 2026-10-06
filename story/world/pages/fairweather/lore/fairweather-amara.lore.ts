import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherAmara = {
  id: "01a112fc-493c-77c0-b114-abf9fdf2ec06",
  type: "page-type/lore",
  slug: "fairweather-amara",
  title: "Amara",
  world: "world/fairweather",
  about: "character-other/fairweather-amara",
  facts: [
    {
      fact: "Celestine Okafor sings on the festival barge every Midsummer Lantern Night, to the whole Mere.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-amara",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "This Midsummer Celestine means Amara to sing beside her on the barge, for the first time.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-amara",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "Amara has not told her mother she cannot sing a note with anyone listening.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-amara",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "Since the barrow Amara has walked past the Honeycomb twice and not gone in.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-amara"],
    },
    {
      fact: "On the eighteenth Amara came to the Honeycomb at last, ate honey cakes, and took the rest home.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-amara",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "Amara lives in her mother's tall house on Lantern Square.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-amara",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Celestine Okafor, who sings on the Midsummer barge, is Amara's mother.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Elsie heard Amara singing from a high window on Lantern Square, and walked on.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Elsie told Amara the honey cakes in the window were always for her.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-amara",
      ],
    },
    {
      fact: "Amara thanked Elsie for walking on when she heard her singing on Lantern Square.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-amara",
      ],
    },
    {
      fact: "Elsie told Amara she'll be guarding barges on Midsummer night, not listening.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-amara",
      ],
    },
  ],
} as const satisfies Lore
