import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const salesman = {
  id: "01a06586-0a29-777a-8f00-1b7e122496e1",
  type: "world-class",
  slug: "salesman",
  title: "Salesman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
