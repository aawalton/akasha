import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courtAlchemist = {
  id: "01a0657e-134f-7663-8f55-91d420f4d2b9",
  type: "page-type/world-class",
  slug: "court-alchemist",
  title: "Court Alchemist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
