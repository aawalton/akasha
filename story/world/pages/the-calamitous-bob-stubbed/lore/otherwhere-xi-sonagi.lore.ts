import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSonagi = {
  id: "01a0ea88-523b-7b48-974f-2bb8ed5ab7ce",
  type: "page-type/lore",
  slug: "otherwhere-xi-sonagi",
  title: "Sonagi",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sonagi",
  facts: [
    {
      fact: "Sonagi, called Nagi, was a four-color duelist of Helock and a recovering drunk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sonagi is dead, killed by Viv in the Glastian contest in Helock's arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sonagi lived in Helock's arena with his mother while training fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sonagi fought as a third in the Glastian contest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sonagi cracked the core of the young mage Rakan in the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poisoned by Viv's black mana, Sonagi's corpse rose as a revenant.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
