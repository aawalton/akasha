import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGram = {
  id: "01a0ea85-3eb0-7b9d-af57-f04cabdad113",
  type: "page-type/lore",
  slug: "otherwhere-xi-gram",
  title: "Gram",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gram",
  facts: [
    {
      fact: "Gram, also called Garm, is the Knight-Principal, the warrior head of Neriad's temple.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Knight-Principal sits in Mornyr, and the office takes its yearly turn governing the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farren, the Voice of Neriad in Harrak, was Gram's pupil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gram was at Mornyr for the alliance summit where Harrak joined the Paramese Alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mornyr lies blighted and smoking since Khaton rose there; Gram's fate this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
