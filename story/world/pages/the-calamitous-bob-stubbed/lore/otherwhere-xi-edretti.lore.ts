import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEdretti = {
  id: "01a0ea90-86da-7bab-ae5e-be807c7715ee",
  type: "page-type/lore",
  slug: "otherwhere-xi-edretti",
  title: "Marshal Edretti",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-edretti",
  facts: [
    {
      fact: "Marshal Edretti commands South End, the Baranese march facing the southern barbarians.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edretti is hot-headed, and hates the hadals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edretti fought in the alliance against the Nemeti at the pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Edretti is this season, after Baran's civil war, is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:28:55.386Z",
  updatedAt: "2026-09-29T00:29:01.000Z",
} as const satisfies Lore
