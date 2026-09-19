import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const accountants = {
  id: "01a0657e-1323-717d-8d9a-8d2af7604887",
  type: "page-type/world-class",
  slug: "accountants",
  title: "Accountants",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
