import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereBea2 = {
  id: "01a0ff34-6859-70e8-a7be-45d523738d13",
  type: "page-type/lore",
  slug: "hollowmere-bea-2",
  title: "Bea, continued",
  world: "world/hollowmere",
  about: "character-other/hollowmere-bea",
  facts: [
    {
      fact: "Bea slept in Nala's bed in 14, curled at her back, kissed her neck, and whispered I'm proud of you.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
      ],
    },
  ],
} as const satisfies Lore
