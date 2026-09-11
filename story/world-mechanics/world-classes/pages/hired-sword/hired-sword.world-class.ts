import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const hiredSword = {
  id: "01a0657e-1374-7b73-8087-2e86560cd8d0",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "hired-sword",
  title: "Hired Sword",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
