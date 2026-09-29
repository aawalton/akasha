import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveContractRefuser = {
  id: "01a0ea15-fcf0-7ec5-b517-b4ea7590db68",
  type: "page-type/lore",
  slug: "super-supportive-contract-refuser",
  title: "Contract refusers",
  world: "world/super-supportive",
  about: "world-title/super-supportive-contract-refuser",
  facts: [
    {
      fact: "The System keeps offering the Contract, for one refuser every morning two minutes after waking.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
