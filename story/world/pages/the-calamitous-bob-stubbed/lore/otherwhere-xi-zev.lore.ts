import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiZev = {
  id: "01a0ea8c-6e91-710e-ae66-3c8883b388d2",
  type: "page-type/lore",
  slug: "otherwhere-xi-zev",
  title: "Zev",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-zev",
  facts: [
    {
      fact: "Old Zev is an innkeeper in Enoria, on the road Viv took north to Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Old Zev keeps his inn in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
