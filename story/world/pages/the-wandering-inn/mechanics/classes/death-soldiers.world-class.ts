import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deathSoldiers = {
  id: "01a0657e-1351-7c58-bf5f-0f2997548471",
  type: "page-type/world-class",
  slug: "death-soldiers",
  title: "Death Soldiers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
