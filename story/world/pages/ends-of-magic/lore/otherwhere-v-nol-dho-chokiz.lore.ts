import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVNolDhoChokiz = {
  id: "01a0e9f9-115f-7f8a-9e37-9ce57e071521",
  type: "page-type/lore",
  slug: "otherwhere-v-nol-dho-chokiz",
  title: "Nol dho Chokiz",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-nol-dho-chokiz",
  facts: [
    {
      fact: "Nol dho Chokiz is a mage of Giantsrest, of the Chokiz estate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Chokiz estate has parkland and an industrial district of slave workshops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Printers, crafters and enchanters' laborers toil as slaves in the Chokiz workshops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Nol lives in Giantsrest, served by the estate's slaves.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
