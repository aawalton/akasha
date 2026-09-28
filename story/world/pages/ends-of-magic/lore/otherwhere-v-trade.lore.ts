import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTrade = {
  id: "01a0ea04-c282-78bf-baff-141d7571c291",
  type: "page-type/lore",
  slug: "otherwhere-v-trade",
  title: "Trade",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-trade",
  facts: [
    {
      fact: "Trade between continents goes by sea, often in high-walled galleons built for long voyages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sailors keep well clear of the sea's great vortices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ports inspect goods at customs, and nations lay trade embargoes on one another.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Artifice guilds sell magical goods at auction.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dimensional bags let travelers carry gear, maps and supplies far beyond their bulk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enchanted sleeping rolls and enchanted camping lamps are sold to travelers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merchants in far ports hunger for trade news from outside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
