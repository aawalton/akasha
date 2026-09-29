import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEnorianSeparatists = {
  id: "01a0ea82-9a31-78cb-ad39-d34c217ac11e",
  type: "page-type/lore",
  slug: "otherwhere-xi-enorian-separatists",
  title: "The Enorian Separatists",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-enorian-separatists",
  facts: [
    {
      fact: "The separatists held northern Enoria, ruled from Losserec-on-the-Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangor, called the Nigh King, led the separatists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangor's elite team stormed Green Edge and killed the royalist Crown Prince Kule.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The separatists won the civil war, and Sangor was crowned King of Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Losserec keeps the best spies of Param; its shadow agents solve problems quietly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yrlin of the Thorns, an archwitch of Losserec, is Sangor's lover.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
