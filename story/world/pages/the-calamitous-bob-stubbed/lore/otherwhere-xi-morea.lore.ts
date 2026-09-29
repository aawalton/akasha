import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMorea = {
  id: "01a0ea80-4334-7ac6-a7fc-a413915f0f69",
  type: "page-type/lore",
  slug: "otherwhere-xi-morea",
  title: "Morea",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-morea",
  facts: [
    {
      fact: "Morea is a cleric of Sardanal who helps heal at Helock's medical faculty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Morea knows a prayer that stops blood loss.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Morea helped Viv restore Sidjin's body in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Morea serves Sardanal in Helock, now under Maranor's banner.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
