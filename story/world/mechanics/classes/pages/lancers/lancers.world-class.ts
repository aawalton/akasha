import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lancers = {
  id: "01a0657e-138c-7c89-8d37-d5595fb5ce02",
  type: "page-type/world-class",
  slug: "lancers",
  title: "Lancers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
