import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const deathLoop = {
  id: "01a0d41b-c868-71a6-92a7-1155450af52a",
  type: "page-type/lore",
  slug: "death-loop",
  title: "Death Loop",
  world: "world/personas",
  about: "world-mechanic/the-tower-death-loop",
  secrets: "jsonl",
} as const satisfies Lore
