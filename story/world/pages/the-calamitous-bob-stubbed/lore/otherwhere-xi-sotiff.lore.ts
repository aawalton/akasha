import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSotiff = {
  id: "01a0ea88-523c-72b0-8f4a-6249bf56a0d0",
  type: "page-type/lore",
  slug: "otherwhere-xi-sotiff",
  title: "Sotiff",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sotiff",
  facts: [
    {
      fact: "Sotiff the Stoneshaper was a brown archmage of Helock, long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sotiff led the brown archmages who built the Academy's great dome, partly with gravitite.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
