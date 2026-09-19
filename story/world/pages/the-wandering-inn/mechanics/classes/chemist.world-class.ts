import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chemist = {
  id: "01a0657e-1349-7e41-9345-fc9f27e4445a",
  type: "page-type/world-class",
  slug: "chemist",
  title: "Chemist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
