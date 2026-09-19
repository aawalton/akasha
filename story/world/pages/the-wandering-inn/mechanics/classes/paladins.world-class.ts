import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const paladins = {
  id: "01a0657e-0236-7348-bb10-18e90ba004d0",
  type: "page-type/world-class",
  slug: "paladins",
  title: "Paladins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
