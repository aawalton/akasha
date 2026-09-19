import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const plagueHealer = {
  id: "01a06586-0a09-71a5-8053-3b1f14bf597f",
  type: "page-type/world-class",
  slug: "plague-healer",
  title: "Plague Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
