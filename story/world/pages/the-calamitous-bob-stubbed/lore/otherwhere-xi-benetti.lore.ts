import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBenetti = {
  id: "01a0ea79-96af-70a4-9706-484fedaeb2c8",
  type: "page-type/lore",
  slug: "otherwhere-xi-benetti",
  title: "Benetti",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-benetti",
  facts: [
    {
      fact: "Benetti was a convict in the deadlands in Viv's first year on Nyil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Benetti gave his life to save others in the deadlands; Viv counts him among her lost friends.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Benetti is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
