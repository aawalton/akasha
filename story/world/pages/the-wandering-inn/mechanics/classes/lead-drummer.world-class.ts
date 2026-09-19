import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const leadDrummer = {
  id: "01a0657e-021a-7d37-ac9f-bbdd16e813e2",
  type: "page-type/world-class",
  slug: "lead-drummer",
  title: "Lead Drummer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
