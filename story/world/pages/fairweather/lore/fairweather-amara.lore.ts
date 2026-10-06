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
      ],
    },
    {
      fact: "This Midsummer Celestine means Amara to sing beside her on the barge, for the first time.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-amara"],
    },
    {
      fact: "Amara has not told her mother she cannot sing a note with anyone listening.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-amara"],
    },
    {
      fact: "Since the barrow Amara has walked past the Honeycomb twice and not gone in.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-amara"],
    },
    {
      fact: "Amara lives in her mother's tall house on Lantern Square.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-amara"],
    },
  ],
} as const satisfies Lore
