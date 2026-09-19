import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const housemaid = {
  id: "01a0657e-01f9-7ecc-b8a4-5708cc8e3997",
  type: "page-type/world-class",
  slug: "housemaid",
  title: "Housemaid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
