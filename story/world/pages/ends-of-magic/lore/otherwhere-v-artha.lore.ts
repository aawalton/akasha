import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVArtha = {
  id: "01a0e9f7-b02d-7dd1-bd20-7c7ccf60947e",
  type: "page-type/lore",
  slug: "otherwhere-v-artha",
  title: "Artha",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-artha",
  facts: [
    {
      fact: "Artha is an elk-centaur: elk below, man above, maple-bark gray skin, antlers and silver hair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has a deep, smooth voice and scouts for Gemore on Vhala's team.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Artha knows how to fight mages with rage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Artha scouts Taeol's tower west of Giantsrest with Vhala, Emerald and Wiam.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
