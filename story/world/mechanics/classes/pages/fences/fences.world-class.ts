import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fences = {
  id: "01a0657e-1364-7439-96a4-8eab0e860c47",
  type: "page-type/world-class",
  slug: "fences",
  title: "Fences",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
