import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordsmasters = {
  id: "01a0657e-0263-7ee0-9d81-ca28e7f92c35",
  type: "page-type/world-class",
  slug: "swordsmasters",
  title: "Swordsmasters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
