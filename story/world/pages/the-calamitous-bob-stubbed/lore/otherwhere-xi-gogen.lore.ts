import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGogen = {
  id: "01a0ea85-3eaf-78f9-b944-2b2b40ff1381",
  type: "page-type/lore",
  slug: "otherwhere-xi-gogen",
  title: "Gogen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gogen",
  facts: [
    {
      fact: "Gogen is an old cleaner who rose to run the palace staff at Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Gogen is thought to be keeping the palace at Sinur's Gate as ever.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
