import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const printers = {
  id: "01a06586-0a18-7246-99dd-65e0c1cf6e1a",
  type: "page-type/world-class",
  slug: "printers",
  title: "Printers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
