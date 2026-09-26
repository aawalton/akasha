import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const slowTread = {
  id: "01a0ddff-b8bd-7e2c-a24a-db3492f1e799",
  type: "page-type/lore",
  slug: "slow-tread",
  title: "Slow-Tread",
  world: "world/cornerstone",
  about: "world-character/cornerstone-slow-tread",
  secrets: "jsonl",
} as const satisfies Lore
