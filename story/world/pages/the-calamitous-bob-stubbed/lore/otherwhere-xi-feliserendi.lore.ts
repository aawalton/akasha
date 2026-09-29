import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFeliserendi = {
  id: "01a0ea83-df1c-7e9f-a936-5b668a75088b",
  type: "page-type/lore",
  slug: "otherwhere-xi-feliserendi",
  title: "Feliserendi",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-feliserendi",
  facts: [
    {
      fact: "Feliserendi is the ambassador of Luten and its Pure League to the Paramese Alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the Mornyr summit Feliserendi railed against lesser species and threatened war over Kark iron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Pure League was expelled from the alliance council after that summit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Feliserendi is this season is unknown; Luten bought peace from Harrak in the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
