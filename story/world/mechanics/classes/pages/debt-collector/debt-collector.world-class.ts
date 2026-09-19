import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const debtCollector = {
  id: "01a0657e-1352-74af-86d9-22736db9083d",
  type: "page-type/world-class",
  slug: "debt-collector",
  title: "Debt Collector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
