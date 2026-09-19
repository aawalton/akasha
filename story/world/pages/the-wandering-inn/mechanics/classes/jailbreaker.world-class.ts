import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const jailbreaker = {
  id: "01a0657e-020b-7475-8cbd-ed7c191072ed",
  type: "page-type/world-class",
  slug: "jailbreaker",
  title: "Jailbreaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
