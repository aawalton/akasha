import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const jokester = {
  id: "01a0657e-020b-7623-864c-e745c95983fa",
  type: "page-type/world-class",
  slug: "jokester",
  title: "Jokester",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
