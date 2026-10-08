import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRathclaw = {
  id: "01a0ea84-e791-7103-8b54-b0444f64dbcb",
  type: "page-type/lore",
  slug: "otherwhere-xi-rathclaw",
  title: "Rathclaw",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-rathclaw",
  facts: [
    {
      fact: "Rathclaws are wild beasts known both in Vizim and on Param.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rathclaws roam the countryside around Ravinport on Vizim's Golden Coast.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:16:13.713Z",
  updatedAt: "2026-09-29T00:16:21.000Z",
} as const satisfies Lore
