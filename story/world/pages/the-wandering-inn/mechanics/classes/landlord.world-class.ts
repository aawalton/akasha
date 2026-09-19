import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const landlord = {
  id: "01a0657e-138c-74d0-bd0f-1ea3112e8138",
  type: "page-type/world-class",
  slug: "landlord",
  title: "Landlord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
