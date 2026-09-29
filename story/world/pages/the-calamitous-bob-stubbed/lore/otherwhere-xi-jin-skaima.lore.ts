import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJinSkaima = {
  id: "01a0ea89-b5d0-75c1-abd8-7185ee1ad69d",
  type: "page-type/lore",
  slug: "otherwhere-xi-jin-skaima",
  title: "Jin Skaima",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jin-skaima",
  facts: [
    {
      fact: "Jin Skaima was the secret hidden-branch mage-assassin of Helock's Skaima family.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jin was exposed when Viv staged a robbery of a Skaima carriage, which ruined the family.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "What became of Jin Skaima is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
