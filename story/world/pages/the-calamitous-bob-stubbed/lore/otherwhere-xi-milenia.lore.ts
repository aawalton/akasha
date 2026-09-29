import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMilenia = {
  id: "01a0ea80-4334-7614-92d7-42a5faf706d2",
  type: "page-type/lore",
  slug: "otherwhere-xi-milenia",
  title: "Milenia",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-milenia",
  facts: [
    {
      fact: "Milenia is a severe Baranese teacher at the Academy of Helock who sets the written tests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Milenia backed Viv's entry to the Academy's military class.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Milenia is among the Academy's staff, scattered since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
