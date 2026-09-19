import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveTakers = {
  id: "01a06586-0a3f-7874-ade6-0397fdf57c5c",
  type: "page-type/world-class",
  slug: "slave-takers",
  title: "Slave Takers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
