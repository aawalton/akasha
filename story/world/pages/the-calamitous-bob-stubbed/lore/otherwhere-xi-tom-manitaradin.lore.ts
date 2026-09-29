import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTomManitaradin = {
  id: "01a0ea8a-f293-78b4-ad69-285c19feef42",
  type: "page-type/lore",
  slug: "otherwhere-xi-tom-manitaradin",
  title: "Tom Manitaradin",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tom-manitaradin",
  facts: [
    {
      fact: "Tom Manitaradin was a banker of the Manipeleso Bank and Exchange.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tom Manitaradin left the bank to become Viv's advisor in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tom Manitaradin's assistant is Lan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tom Manitaradin serves New Harrak's court as a financial advisor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
