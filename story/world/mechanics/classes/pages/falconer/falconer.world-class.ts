import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const falconer = {
  id: "01a0657e-1361-7693-9b73-8a628b6d82cc",
  type: "page-type/world-class",
  slug: "falconer",
  title: "Falconer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
