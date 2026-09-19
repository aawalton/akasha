import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const debtCollectors = {
  id: "01a0657e-01cf-7703-a9e3-fd8160b6c211",
  type: "page-type/world-class",
  slug: "debt-collectors",
  title: "Debt Collectors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
