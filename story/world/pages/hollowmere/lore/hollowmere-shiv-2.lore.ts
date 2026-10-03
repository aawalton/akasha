import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereShiv2 = {
  id: "01a101b0-fb28-7642-8dc7-69227313e4c5",
  type: "page-type/lore",
  slug: "hollowmere-shiv-2",
  title: "Shiv, continued",
  world: "world/hollowmere",
  about: "character-other/hollowmere-shiv",
  facts: [
    {
      fact: "Nala told Shiv she's still coming to the rock on Sunday, rain or not; Shiv was pleased.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-shiv",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
      ],
    },
    {
      fact: "Asked what her ward kept in, Shiv said only: Breath; Penhallow looked at her, and let it be.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-penhallow",
        "character-other/hollowmere-kit",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-priya",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-lin",
      ],
    },
    {
      fact: "Shiv will be on the bank at Bea's Saturday training, shouting rude things, in Irish.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "Shiv bellowed at Bea in Irish from the bank: something about her arse, in a kind way.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-shiv",
      ],
    },
  ],
} as const satisfies Lore
