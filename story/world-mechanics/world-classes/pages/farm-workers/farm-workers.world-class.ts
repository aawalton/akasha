import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const farmWorkers = {
  id: "01a0657e-01da-7bd8-8742-3ca8a99fdaf6",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "farm-workers",
  title: "Farm Workers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
