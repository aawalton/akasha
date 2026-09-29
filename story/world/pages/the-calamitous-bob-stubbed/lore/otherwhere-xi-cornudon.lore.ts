import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCornudon = {
  id: "01a0ea80-a39c-7d69-b2b4-3f9db8ff1c2a",
  type: "page-type/lore",
  slug: "otherwhere-xi-cornudon",
  title: "Cornudon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-cornudon",
  facts: [
    {
      fact: "Cornudons are ram-like beasts, the common livestock of Param.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cornudons are placid; they pull carts and plows and are driven with whips.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cornudons are milked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cornudons bleat, and towns full of them smell of their dung.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At harvest, crops are piled onto cornudon carts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cornudon milk turned black is a sign of the dark god Octas' taint.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
