import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereKit3 = {
  id: "01a101fd-3f70-7a78-8369-999db5791e2d",
  type: "page-type/lore",
  slug: "hollowmere-kit-3",
  title: "Kit, continued",
  world: "world/hollowmere",
  about: "character-other/hollowmere-kit",
  facts: [
    {
      fact: "Kit called a pen from Nala's row two benches off, against the rules; the demonstrator looked away.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-kit",
      ],
    },
  ],
} as const satisfies Lore
