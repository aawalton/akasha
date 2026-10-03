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
  ],
} as const satisfies Lore
