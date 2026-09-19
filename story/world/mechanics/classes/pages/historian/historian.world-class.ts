import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const historian = {
  id: "01a0657e-1374-770c-895e-080f735f4d2b",
  type: "page-type/world-class",
  slug: "historian",
  title: "Historian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
