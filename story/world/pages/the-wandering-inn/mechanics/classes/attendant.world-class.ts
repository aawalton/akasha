import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const attendant = {
  id: "01a0657e-1336-7ab4-9550-6a519c74d8aa",
  type: "page-type/world-class",
  slug: "attendant",
  title: "Attendant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
