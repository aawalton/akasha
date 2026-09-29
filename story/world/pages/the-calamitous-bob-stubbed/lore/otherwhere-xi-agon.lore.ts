import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAgon = {
  id: "01a0ea91-ff2a-76cd-ae13-aea0ac851aa9",
  type: "page-type/lore",
  slug: "otherwhere-xi-agon",
  title: "Agon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-agon",
  facts: [
    {
      fact: "Agon is a hero of Kark legend, told of in the sacred tale of Agon and the Old Master.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agon lived long ago; the Kark keep his memory among their honoured ancestors.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
