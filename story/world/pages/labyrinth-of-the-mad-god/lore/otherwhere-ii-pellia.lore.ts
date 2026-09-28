import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiPellia = {
  id: "01a0e9cd-42e6-72e0-9f3e-721e12b28273",
  type: "page-type/lore",
  slug: "otherwhere-ii-pellia",
  title: "Pellia",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Pellia is a winged crossbow master with frosty white skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She trains students against heat-seeking orbs that burst only when struck dead center.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
