import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firefighter = {
  id: "01a0657e-1364-733e-b17a-546cfc9776a7",
  type: "page-type/world-class",
  slug: "firefighter",
  title: "Firefighter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
