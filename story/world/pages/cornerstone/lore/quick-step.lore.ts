import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const quickStep = {
  id: "01a0ddff-b8bc-7509-9d24-90142e41819f",
  type: "page-type/lore",
  slug: "quick-step",
  title: "Quick-Step",
  world: "world/cornerstone",
  about: "world-character/cornerstone-quick-step",
  secrets: "jsonl",
} as const satisfies Lore
