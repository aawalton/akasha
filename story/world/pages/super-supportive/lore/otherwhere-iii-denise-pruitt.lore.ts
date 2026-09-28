import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiiDenisePruitt = {
  id: "01a0e9fc-9ac2-74e8-b3ea-6b6f16939ca3",
  type: "page-type/lore",
  slug: "otherwhere-iii-denise-pruitt",
  title: "Denise Pruitt",
  world: "world/super-supportive",
  about: "character-other/otherwhere-iii-denise-pruitt",
  facts: [
    {
      fact: "The nurse is Denise Pruitt, forty-six, an emergency-room nurse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She rides north to a 5:30 shift at Uptown Memorial Hospital, by the Lawrence stop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lawrence is three stops past Addison, about six minutes on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
