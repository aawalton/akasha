import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crafter = {
  id: "01a0657e-1350-77bc-be45-8881adc71db4",
  type: "page-type/world-class",
  slug: "crafter",
  title: "Crafter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
