import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKalTheMountain = {
  id: "01a0ea8b-d2ff-7e51-8e10-c7691698399e",
  type: "page-type/lore",
  slug: "otherwhere-xi-kal-the-mountain",
  title: "Kal the Mountain",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kal-the-mountain",
  facts: [
    {
      fact: "Kal the Mountain is a heavily armoured champion of Neriad.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kal defended Sardanal's Cradle in its siege, and served as bait against the dark gods' hosts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Kal is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
