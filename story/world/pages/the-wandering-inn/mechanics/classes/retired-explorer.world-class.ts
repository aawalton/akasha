import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const retiredExplorer = {
  id: "01a06586-0a21-77f1-ae08-31bfcf95b41d",
  type: "page-type/world-class",
  slug: "retired-explorer",
  title: "Retired Explorer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
