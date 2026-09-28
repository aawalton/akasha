import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVEsebusCentralTower = {
  id: "01a0e9f7-65b6-7d74-bbcf-866dba942a8b",
  type: "page-type/place",
  slug: "otherwhere-v-esebus-central-tower",
  title: "The Central Tower of Esebus",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-esebus",
  facts: [
    {
      fact: "The central tower is the tallest in Esebus, with a tiered peak where others are flat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The central tower is the city's administrative and enchanting hub, with few residents.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sussu lives atop the central tower, above her vault.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wide plaza of food shops and stalls surrounds the central tower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its six doorways have no doors, only wards and pairs of thirty-foot stone golems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magical workshops fill the levels beneath the central tower.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
