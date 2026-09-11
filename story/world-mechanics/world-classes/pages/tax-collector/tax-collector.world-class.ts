import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const taxCollector = {
  id: "01a06586-0a64-709c-887c-8ac4c60de734",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "tax-collector",
  title: "Tax Collector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
