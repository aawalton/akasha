import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const saleswoman = {
  id: "01a06586-0a29-7374-ab3f-6a4874e41562",
  type: "page-type/world-class",
  slug: "saleswoman",
  title: "Saleswoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
