import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLegeritOfBaran = {
  id: "01a0ea8f-07e4-7afc-a653-996a99edbbb2",
  type: "page-type/lore",
  slug: "otherwhere-xi-legerit-of-baran",
  title: "Legerit of Baran",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-legerit-of-baran",
  facts: [
    {
      fact: "Legerit of Baran was a scholar of colorless mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the year 268 Legerit proved by experiment that Nyil smothers effects harmful to itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Legerit of Baran is long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
