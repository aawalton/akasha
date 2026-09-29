import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJet = {
  id: "01a0ea88-c43d-7467-bf48-9f60e90aedc5",
  type: "page-type/lore",
  slug: "otherwhere-xi-jet",
  title: "Captain Jet",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jet",
  facts: [
    {
      fact: "Captain Jet led some four hundred Sheem templars of Neriad in Oleander's army.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the first night on the Plain of the Gods, Jet and his templars defected to the alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Jet and his templars are with the alliance below Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
