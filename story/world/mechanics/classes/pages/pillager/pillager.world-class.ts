import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pillager = {
  id: "01a0657e-0237-7e1f-a804-b77be83c2e8c",
  type: "page-type/world-class",
  slug: "pillager",
  title: "Pillager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
