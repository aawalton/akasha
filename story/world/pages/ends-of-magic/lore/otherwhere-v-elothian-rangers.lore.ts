import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVElothianRangers = {
  id: "01a0e9f7-12e7-7db1-915f-8ed45c2fb47e",
  type: "page-type/lore",
  slug: "otherwhere-v-elothian-rangers",
  title: "The Elothian Rangers",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-elothian-rangers",
  facts: [
    {
      fact: "The continent of Elothia has its own rangers, the Elothian Rangers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
