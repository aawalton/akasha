import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereYusra2 = {
  id: "01a101b0-fb28-7a74-8fff-9a508befe9c6",
  type: "page-type/lore",
  slug: "hollowmere-yusra-2",
  title: "Yusra, continued",
  world: "world/hollowmere",
  about: "character-other/hollowmere-yusra",
  facts: [
    {
      fact: "Yusra asked Nala to walk up the fell on Saturday, her day off; nine, at the front door.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
      ],
    },
    {
      fact: "Off duty at the Bell, Yusra held up nine fingers to Nala across the room; Nala nodded; Bea saw.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-bea",
      ],
    },
  ],
} as const satisfies Lore
