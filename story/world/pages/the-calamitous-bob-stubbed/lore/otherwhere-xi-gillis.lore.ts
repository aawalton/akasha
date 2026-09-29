import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGillis = {
  id: "01a0ea85-3eae-70cc-9c93-70f168931148",
  type: "page-type/lore",
  slug: "otherwhere-xi-gillis",
  title: "Gillis",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gillis",
  facts: [
    {
      fact: "Gillis is a merl of Sikoua who rides a domesticated giant spider named Spindlecalf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv met Gillis when she visited the hidden merl capital of Sikoua.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Gillis is thought to be among the merls of Sikoua, who fought in the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
