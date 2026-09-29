import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEjirLessi = {
  id: "01a0ea90-86da-7e64-9230-5f434c0fb651",
  type: "page-type/lore",
  slug: "otherwhere-xi-ejir-lessi",
  title: "Ejir Lessi",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ejir-lessi",
  facts: [
    {
      fact: "Ejir Lessi teaches the fundamentals of magic at the Helock Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every Academy student must pass Ejir Lessi's fundamentals course to graduate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ejir Lessi is thought to be among the Academy folk exiled from Helock this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
