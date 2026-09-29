import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNissa = {
  id: "01a0ea81-9b15-7cd6-94c5-570dfc808d24",
  type: "page-type/lore",
  slug: "otherwhere-xi-nissa",
  title: "Nissa",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nissa",
  facts: [
    {
      fact: "Nissa is the granddaughter of Sanle, a wise woman near Losserec in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nissa met Viv when Viv passed through on her way to Losserec.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Nissa lives near Losserec, grown now.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
