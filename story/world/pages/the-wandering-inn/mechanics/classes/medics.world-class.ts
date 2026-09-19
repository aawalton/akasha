import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const medics = {
  id: "01a0657e-139f-7db9-8145-7ca59dc32246",
  type: "page-type/world-class",
  slug: "medics",
  title: "Medics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
