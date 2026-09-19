import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deadlySkulker = {
  id: "01a0657e-1351-7684-8334-a143e013cc60",
  type: "page-type/world-class",
  slug: "deadly-skulker",
  title: "Deadly Skulker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
