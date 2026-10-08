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
    {
      fact: "Many die during the first binding or within a few years of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The topic is taboo among Artonans, and many swear respectful silence about it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T22:41:19.848Z",
  updatedAt: "2026-09-29T01:28:55.000Z",
} as const satisfies Lore
