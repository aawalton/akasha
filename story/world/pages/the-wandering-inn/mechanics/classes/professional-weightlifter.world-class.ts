import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const professionalWeightlifter = {
  id: "01a0657e-0240-74e2-a374-237c8443dfa5",
  type: "page-type/world-class",
  slug: "professional-weightlifter",
  title: "Professional Weightlifter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
