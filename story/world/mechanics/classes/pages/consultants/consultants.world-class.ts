import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const consultants = {
  id: "01a0657e-01c9-7fcd-ad25-e4c05c23577b",
  type: "page-type/world-class",
  slug: "consultants",
  title: "Consultants",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
