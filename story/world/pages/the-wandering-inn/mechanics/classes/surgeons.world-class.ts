import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const surgeons = {
  id: "01a0657e-0262-77de-a8d0-8b8826db1655",
  type: "page-type/world-class",
  slug: "surgeons",
  title: "Surgeons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
