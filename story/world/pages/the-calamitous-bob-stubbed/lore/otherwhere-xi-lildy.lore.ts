import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLildy = {
  id: "01a0ea8e-52d3-73e0-928c-437def71f8fe",
  type: "page-type/lore",
  slug: "otherwhere-xi-lildy",
  title: "Old Lildy",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lildy",
  facts: [
    {
      fact: "Old Lildy was the wise woman of a frontier village at the Deadshield's northern edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lildy made pottery, hunted, and served as the village's midwife and healer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Kordek-hybrid killed Lildy in the spider siege; Lildy is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
