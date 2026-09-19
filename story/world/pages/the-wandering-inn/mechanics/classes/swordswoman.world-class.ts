import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordswoman = {
  id: "01a0657e-0263-7685-9bf5-fa49f1c3f996",
  type: "page-type/world-class",
  slug: "swordswoman",
  title: "Swordswoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
