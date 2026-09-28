import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvLandSpiritsAndDragonVeins = {
  id: "01a0ea11-6b1f-7c76-b938-a97975145c03",
  type: "page-type/lore",
  slug: "otherwhere-iv-land-spirits-and-dragon-veins",
  title: "Land Spirits and Dragon Veins",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Offering Qi to an Earth Spirit is proper courtesy: 'when one gives to the land, it gives back.'",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Large, calm land spirits need dire provocation before they turn destructive.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Provincial Qi totals are thought roughly fixed, declining only slowly over centuries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Qi Wastes are held to be dead zones that can never regenerate Qi.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scholars debate whether Qi Wastes are natural voids or wounds left by the Great Enemy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ancient Breaking slowly poisoned a whole region and turned it to metal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
