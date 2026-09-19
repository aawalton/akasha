import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const adjutant = {
  id: "01a0657e-01a4-7c00-9f22-0181c30bc3ca",
  type: "page-type/world-class",
  slug: "adjutant",
  title: "Adjutant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
