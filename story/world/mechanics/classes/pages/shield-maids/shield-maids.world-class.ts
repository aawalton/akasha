import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldMaids = {
  id: "01a06586-0a3a-7018-8920-cd25a057cee4",
  type: "page-type/world-class",
  slug: "shield-maids",
  title: "Shield Maids",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
