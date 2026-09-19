import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bureaucrat = {
  id: "01a0657e-1341-7f19-813a-c9073e13e4d5",
  type: "page-type/world-class",
  slug: "bureaucrat",
  title: "Bureaucrat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
