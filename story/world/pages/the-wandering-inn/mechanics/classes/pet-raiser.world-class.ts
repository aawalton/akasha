import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const petRaiser = {
  id: "01a0657e-0237-72e7-825e-51045f50e603",
  type: "page-type/world-class",
  slug: "pet-raiser",
  title: "Pet Raiser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
