import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKinei = {
  id: "01a0ea91-ff2c-79bb-8337-0c0f59567b27",
  type: "page-type/lore",
  slug: "otherwhere-xi-kinei",
  title: "Kinei",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kinei",
  facts: [
    {
      fact: "Kinei is one of the people of Viv's court and army in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kinei is thought to be in New Harrak's service this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
