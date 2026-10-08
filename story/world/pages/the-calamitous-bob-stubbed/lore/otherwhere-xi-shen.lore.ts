import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShen = {
  id: "01a0ea88-523b-7f79-b4e9-1f0b60c1c29d",
  type: "page-type/lore",
  slug: "otherwhere-xi-shen",
  title: "Shen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shen",
  facts: [
    {
      fact: "Shen was a councilor of Luten, seat of the Pure League.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shen is dead, killed by Viv in the last war before Luten bought thirty years of peace.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:19:57.627Z",
  updatedAt: "2026-09-29T00:20:02.000Z",
} as const satisfies Lore
