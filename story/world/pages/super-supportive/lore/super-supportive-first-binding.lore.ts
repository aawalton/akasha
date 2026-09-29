import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveFirstBinding = {
  id: "01a0ea2e-05e8-7e0a-99fa-fe9485815363",
  type: "page-type/lore",
  slug: "super-supportive-first-binding",
  title: "First binding",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-first-binding",
  facts: [
    {
      fact: "It is done so knights can fight demons in chaotic places.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
