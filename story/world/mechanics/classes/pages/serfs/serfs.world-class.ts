import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const serfs = {
  id: "01a0657e-024c-7a75-b6ba-e51d845d0717",
  type: "page-type/world-class",
  slug: "serfs",
  title: "Serfs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
