import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiTheReedCourtier = {
  id: "01a0ed29-de58-7f49-a5f0-f3baa9e6b1c4",
  type: "page-type/lore",
  slug: "overwhere-ii-the-reed-courtier",
  title: "The Reed Courtier",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Valley children sing of the Reed Man, who stands in the Wendle shallows and asks for a gift.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old folk say never to thank the Reed Man, nor shake his hand, nor tell him your name.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
