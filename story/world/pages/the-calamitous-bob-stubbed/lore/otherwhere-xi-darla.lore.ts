import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDarla = {
  id: "01a0ea7c-0781-73cb-8176-cd158ae47faa",
  type: "page-type/lore",
  slug: "otherwhere-xi-darla",
  title: "Darla",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-darla",
  facts: [
    {
      fact: "Darla is a southern Enorian woman who keeps the front desk of the Helock Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Darla always seems tired, and handled Viv's admission to the Academy years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Darla served as an aide to Dean Tallit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Darla was at the Academy when Oleander took Helock and Tallit was slain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Darla is among the Academy folk who fled Helock by portal, it is thought.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
