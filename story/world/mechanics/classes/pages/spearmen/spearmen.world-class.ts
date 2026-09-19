import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearmen = {
  id: "01a06586-0a50-75e5-a445-1cef60353beb",
  type: "page-type/world-class",
  slug: "spearmen",
  title: "Spearmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
