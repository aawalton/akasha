import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvTieBo = {
  id: "01a0eaab-f292-75f2-81a3-cd753ee121d9",
  type: "page-type/lore",
  slug: "otherwhere-iv-tie-bo",
  title: "Tie Bo",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Tie Bo is lean and weathered, carries a bow, and speaks low and rough.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "Zhao Jun told Tie Bo that Nala said the wall-breaker might be a boar or a spirit beast.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iv-nala",
        "character-other/otherwhere-iv-zhao-jun",
      ],
    },
    {
      fact: "At dusk by the shrine, Tie Bo asked Nala whether the wall-breaker is a boar or a spirit beast.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "At night by the shrine, Tie Bo asked Nala to come with him to Granny Hua's door in the morning.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "Tie Bo said he would ask Granny Hua for the poison at first light.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-iv-tie-bo",
        "character-player/otherwhere-iv-nala",
      ],
    },
  ],
} as const satisfies Lore
