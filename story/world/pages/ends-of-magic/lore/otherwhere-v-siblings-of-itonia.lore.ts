import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSiblingsOfItonia = {
  id: "01a0e9f7-12e8-714a-9f51-5b46384028d2",
  type: "page-type/lore",
  slug: "otherwhere-v-siblings-of-itonia",
  title: "The Siblings of Itonia",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-siblings-of-itonia",
  facts: [
    {
      fact: "The Siblings of Itonia are lithe warriors who fight for Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
