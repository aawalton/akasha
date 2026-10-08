import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiIkos = {
  id: "01a0ea87-2a4e-74a6-b374-9ced108fe344",
  type: "page-type/lore",
  slug: "otherwhere-xi-ikos",
  title: "Ikos",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ikos",
  facts: [
    {
      fact: "Ikos was a griffin rider of Helock, among the city's elite shock troops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ikos flew against Viv when she broke out of Helock's town hall keep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv and Arthur brought Ikos down in that fight; he is believed dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:18:41.870Z",
  updatedAt: "2026-09-29T00:18:48.000Z",
} as const satisfies Lore
