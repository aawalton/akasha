import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportive1963Agreement = {
  id: "01a0ea01-2f61-7c1e-9e7b-11780b92bf56",
  type: "page-type/lore",
  slug: "super-supportive-1963-agreement",
  title: "The 1963 Agreement",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-1963-agreement",
  facts: [
    {
      fact: "It bars forced psychological adjustments through the System.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under it humans govern themselves; Artonans intervene only past eight million deaths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under it Earth must deliver a number of suitable people into contractual servitude.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A selectee may refuse to sign on principle, but may not refuse to serve.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
