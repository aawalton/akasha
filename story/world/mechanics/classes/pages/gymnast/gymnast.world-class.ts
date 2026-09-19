import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gymnast = {
  id: "01a0657e-01ee-7b6f-8cf0-466db1159476",
  type: "page-type/world-class",
  slug: "gymnast",
  title: "Gymnast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
