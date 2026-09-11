import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const debtCollector = {
  id: "01a0657e-1352-74af-86d9-22736db9083d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "debt-collector",
  title: "Debt Collector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
