import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMoney = {
  id: "01a0ea04-c281-7f27-b1ca-ec589416109e",
  type: "page-type/lore",
  slug: "otherwhere-v-money",
  title: "Money",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-money",
  facts: [
    {
      fact: "Each nation keeps its own money; a stranger arriving without it cannot buy passage or goods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ostren has a standard currency of its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemstones and enchanting materials pass as payment among the wealthy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questor restaurants exchange currencies and post rates for rare materials and magic items.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Such restaurants keep evaluators on staff to judge rare magical artifacts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cheapest Questor meal in Driftmere costs as much as a good Gemore sword.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Visitors to Ostren expect to be cheated.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
