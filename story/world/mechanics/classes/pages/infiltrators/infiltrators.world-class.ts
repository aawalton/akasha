import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const infiltrators = {
  id: "01a0657e-01fb-7f76-94a0-26b76d89396b",
  type: "page-type/world-class",
  slug: "infiltrators",
  title: "Infiltrators",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
