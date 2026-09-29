import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSeldonUponTane = {
  id: "01a0ea88-4595-7df3-97d3-c41f79ef8ecc",
  type: "page-type/place",
  slug: "otherwhere-xi-seldon-upon-tane",
  title: "Seldon-upon-Tane",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Seldon-upon-Tane is a small Enorian town in the separatist north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road from Seldon-upon-Tane runs due north to Losserec.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the civil war a royalist army of thousands camped near Seldon-upon-Tane, burning villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv was ambushed and captured by royalists at Seldon-upon-Tane in the civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
