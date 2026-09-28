import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTreeBehemoth = {
  id: "01a0ea36-ee72-7e52-bf69-e2c37d92e476",
  type: "page-type/lore",
  slug: "otherwhere-ix-tree-behemoth",
  title: "Tree behemoth",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-tree-behemoth",
  facts: [
    {
      fact: "Tree behemoths are two-legged giants, part tree and part animal, about a hundred feet tall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They walk the forests of the F Grade Malar Zone, ruled by Farros, God of Temperance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the hills at the Malar Zone's edge one can be seen moving among the treetops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To Firrelians they are part of the scenery of the green lands, as unremarkable as weather.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their grade, temper and cores are not known in Sun City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
