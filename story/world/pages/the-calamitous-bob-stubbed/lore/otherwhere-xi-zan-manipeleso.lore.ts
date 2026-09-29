import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiZanManipeleso = {
  id: "01a0ea8c-6e91-7cb1-a18b-235706d779e4",
  type: "page-type/lore",
  slug: "otherwhere-xi-zan-manipeleso",
  title: "Zan Manipeleso",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-zan-manipeleso",
  facts: [
    {
      fact: "Zan Manipeleso is a banker of the clan that owns the Manipeleso Bank and Exchange.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zan is a retired Dark Blade, an assassin of Luten's order.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zan dealt with Viv from her first days in Kazar and again in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Zan serves the Manipeleso bank, rival to Avarice's Golden Scale Bank.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
