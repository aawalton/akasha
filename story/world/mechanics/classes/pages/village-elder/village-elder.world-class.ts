import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const villageElder = {
  id: "01a06586-0a70-7b38-86fd-36202c7d6618",
  type: "page-type/world-class",
  slug: "village-elder",
  title: "Village Elder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
