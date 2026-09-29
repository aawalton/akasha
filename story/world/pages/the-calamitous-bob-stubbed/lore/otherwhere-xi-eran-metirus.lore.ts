import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEranMetirus = {
  id: "01a0ea81-c5cc-7462-b652-f4f567b9d10e",
  type: "page-type/lore",
  slug: "otherwhere-xi-eran-metirus",
  title: "Eran Metirus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eran-metirus",
  facts: [
    {
      fact: "Eran Metirus is a student of the Helock Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eran Metirus was at the Academy when Oleander took Helock and its students fled by portal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Eran Metirus is thought to be among the Academy's students in exile.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
