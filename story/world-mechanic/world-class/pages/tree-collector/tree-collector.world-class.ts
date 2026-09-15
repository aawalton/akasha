import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const treeCollector = {
  id: "01a0657e-026d-7596-91b3-ad48dfb5e71e",
  type: "world-class",
  slug: "tree-collector",
  title: "Tree Collector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
