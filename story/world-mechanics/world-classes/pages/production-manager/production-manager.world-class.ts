import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const productionManager = {
  id: "01a06586-0a18-7de8-8dea-8b867262ef8b",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "production-manager",
  title: "Production Manager",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
