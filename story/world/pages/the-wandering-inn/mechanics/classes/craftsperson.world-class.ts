import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const craftsperson = {
  id: "01a0657e-01cc-7dcd-83df-69659570ecc0",
  type: "page-type/world-class",
  slug: "craftsperson",
  title: "Craftsperson",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
