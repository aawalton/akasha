import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const taxCollectors = {
  id: "01a0657e-0269-7212-bea0-5f4a6a9cf451",
  type: "page-type/world-class",
  slug: "tax-collectors",
  title: "Tax Collectors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
