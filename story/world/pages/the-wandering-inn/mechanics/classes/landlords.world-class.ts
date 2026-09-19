import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const landlords = {
  id: "01a0657e-021a-7ddb-9436-d6220cbaa2c0",
  type: "page-type/world-class",
  slug: "landlords",
  title: "Landlords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
