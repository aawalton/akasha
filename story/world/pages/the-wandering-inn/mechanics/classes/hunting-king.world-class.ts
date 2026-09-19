import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const huntingKing = {
  id: "01a0657e-1375-7a60-80a7-bec6f71b850f",
  type: "page-type/world-class",
  slug: "hunting-king",
  title: "Hunting King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
