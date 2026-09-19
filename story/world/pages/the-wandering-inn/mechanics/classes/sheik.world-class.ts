import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sheik = {
  id: "01a06586-0a3a-7d3e-b3ea-b3edfc30951e",
  type: "page-type/world-class",
  slug: "sheik",
  title: "Sheik",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
