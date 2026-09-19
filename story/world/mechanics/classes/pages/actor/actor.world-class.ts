import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const actor = {
  id: "01a0657e-1325-7b4f-b56d-7043af780b03",
  type: "page-type/world-class",
  slug: "actor",
  title: "Actor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
