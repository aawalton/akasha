import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const safetyConsultants = {
  id: "01a0657e-0249-7402-9d7b-6f7e0e84271f",
  type: "page-type/world-class",
  slug: "safety-consultants",
  title: "Safety Consultants",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
