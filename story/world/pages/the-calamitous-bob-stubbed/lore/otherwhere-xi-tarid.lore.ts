import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTarid = {
  id: "01a0ea8a-26e4-7dc4-9881-bd16e8e7234d",
  type: "page-type/lore",
  slug: "otherwhere-xi-tarid",
  title: "Tarid",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tarid",
  facts: [
    {
      fact: "Tarid was a gangly student duelist at the Academy of Helock in Viv's time there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tarid is a grown mage, whereabouts unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
