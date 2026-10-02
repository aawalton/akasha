import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereNala2 = {
  id: "01a0fe5a-f9cf-7952-8350-37a7c9696353",
  type: "page-type/lore",
  slug: "hollowmere-nala-2",
  title: "Nala, continued",
  world: "world/hollowmere",
  about: "character-player/hollowmere-nala",
  facts: [
    {
      fact: "Nala signed for cold-water swimming, and Shiv signed under her: Doyle (reluctant).",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-shiv",
      ],
    },
  ],
} as const satisfies Lore
