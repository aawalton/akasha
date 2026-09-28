import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiHiddenCurrents = {
  id: "01a0ea43-4883-7510-8014-7154073b91ac",
  type: "page-type/lore",
  slug: "otherwhere-vii-hidden-currents",
  title: "Hidden Currents",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Crime syndicates run drugs, brothels and smuggling in the old Empire's cities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fried potato chips, fizzy sweet soda and a bitter drink called coffee are a new craze.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
