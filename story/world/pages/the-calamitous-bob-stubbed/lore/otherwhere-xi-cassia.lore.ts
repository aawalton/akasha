import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCassia = {
  id: "01a0ea7b-2e7b-7164-b283-aa440653b3ab",
  type: "page-type/lore",
  slug: "otherwhere-xi-cassia",
  title: "Cassia",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-cassia",
  facts: [
    {
      fact: "Cassia was a champion of Neriad in the days of the old Harrakan Empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cassia's Last Gift is a pure pool in a deadland grotto that washes away corruption.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Neriad says Cassia's Last Gift holds her lifetime of love and sacrifice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cassia's mummified remains lie at her Last Gift, west past the dunes; Cassia is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
