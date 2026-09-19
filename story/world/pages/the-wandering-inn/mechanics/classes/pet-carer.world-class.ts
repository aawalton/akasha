import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const petCarer = {
  id: "01a0657e-0237-7b2b-8e00-8d15c1f7d08c",
  type: "page-type/world-class",
  slug: "pet-carer",
  title: "Pet Carer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
