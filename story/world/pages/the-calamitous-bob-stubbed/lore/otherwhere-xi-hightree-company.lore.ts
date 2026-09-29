import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHightreeCompany = {
  id: "01a0ea7e-cc4a-795f-9039-b819ab84f318",
  type: "page-type/lore",
  slug: "otherwhere-xi-hightree-company",
  title: "The Hightree Company",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-hightree-company",
  facts: [
    {
      fact: "The Hightree Company is one of Harrak's first heavy infantry companies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hightree heavies wear tabards marked with a tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hightree heavies are furious fighters who will fight to the last warrior.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hightree soldiers walk the third step of the Harrakan heavy infantry path.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
