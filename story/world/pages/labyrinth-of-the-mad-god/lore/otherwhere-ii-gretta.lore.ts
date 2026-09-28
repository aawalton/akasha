import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiGretta = {
  id: "01a0e9ce-117f-75d3-b147-358e98d51725",
  type: "page-type/lore",
  slug: "otherwhere-ii-gretta",
  title: "Gretta of Velen",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Gretta is a crafter of Velen, a seven-foot bird with blue plumage and chrome magitech arms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She greets visitors with the words: Greetings, traveler of the Labyrinth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She buys unused materials and prices work by time, mana and sourced resources.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
