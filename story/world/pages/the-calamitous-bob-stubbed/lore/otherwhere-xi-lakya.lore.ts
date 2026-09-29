import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLakya = {
  id: "01a0ea8f-07e4-7c88-aaa0-23497f3587dc",
  type: "page-type/lore",
  slug: "otherwhere-xi-lakya",
  title: "Lakya",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lakya",
  facts: [
    {
      fact: "Lakya was the cook of the Wayfarers, a Helock gang.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lakya was poisoned when Solfis took the Wayfarers over; she is believed dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
