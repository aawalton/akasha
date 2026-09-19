import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drummer = {
  id: "01a0657e-1358-7953-aef9-ed771262a7c3",
  type: "page-type/world-class",
  slug: "drummer",
  title: "Drummer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
