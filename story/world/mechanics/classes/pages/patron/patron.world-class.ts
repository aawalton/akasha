import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const patron = {
  id: "01a0657e-0236-7ff9-b68c-c2a03773bb97",
  type: "page-type/world-class",
  slug: "patron",
  title: "Patron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
