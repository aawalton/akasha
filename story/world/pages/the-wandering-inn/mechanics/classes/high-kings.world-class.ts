import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const highKings = {
  id: "01a0657e-01f8-74fb-95ea-ca0832ced3c6",
  type: "page-type/world-class",
  slug: "high-kings",
  title: "High Kings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
