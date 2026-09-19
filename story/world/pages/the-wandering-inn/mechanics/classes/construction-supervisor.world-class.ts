import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const constructionSupervisor = {
  id: "01a0657e-01c9-7755-976d-14fe077e21ac",
  type: "page-type/world-class",
  slug: "construction-supervisor",
  title: "Construction Supervisor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
