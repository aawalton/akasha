import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSelno = {
  id: "01a0ea88-523b-71c5-84a6-a6ed6538544a",
  type: "page-type/lore",
  slug: "otherwhere-xi-selno",
  title: "Selno",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-selno",
  facts: [
    {
      fact: "Count Selno is an Enorian count whose lands lie north of the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Selno starved his peasants until they rose in rebellion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Selno hired kark mercenaries, then betrayed them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv freed Marruk from Selno's prison convoy; Selno's court mage let her band pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Selno holds his county in Enoria, so far as is known.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
