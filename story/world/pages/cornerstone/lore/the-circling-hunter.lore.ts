import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theCirclingHunter = {
  id: "01a0ddff-b8bd-7071-b426-4c623308eec8",
  type: "page-type/lore",
  slug: "the-circling-hunter",
  title: "The Circling Hunter",
  world: "world/cornerstone",
  about: "world-character/cornerstone-the-circling-hunter",
  secrets: "jsonl",
} as const satisfies Lore
