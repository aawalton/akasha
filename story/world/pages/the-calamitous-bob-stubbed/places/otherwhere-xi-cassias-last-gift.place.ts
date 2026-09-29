import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiCassiasLastGift = {
  id: "01a0ea80-ba69-7c83-90cc-e99f3634b3ae",
  type: "page-type/place",
  slug: "otherwhere-xi-cassias-last-gift",
  title: "Cassia's Last Gift",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-deadlands",
  facts: [
    {
      fact: "Cassia's Last Gift is a grotto spring in the deadlands, west past the dunes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cassia's Last Gift lies beside a small derelict town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pure pool of Cassia's Last Gift washes away corruption and poison.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cassia's Last Gift is one of the few Old Empire artifacts to survive the cataclysm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cassia was one of Neriad's champions; her mummified remains lie at the grotto.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Neriad holds Cassia's Last Gift sacred, the fruit of her lifetime of love and sacrifice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poisoned dragons have bathed in Cassia's Last Gift to heal, to Neriad's annoyance.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
