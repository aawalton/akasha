import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const competitiveRacer = {
  id: "01a0657e-134c-7fb1-87c6-08f8c7e484d4",
  type: "page-type/world-class",
  slug: "competitive-racer",
  title: "Competitive Racer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
