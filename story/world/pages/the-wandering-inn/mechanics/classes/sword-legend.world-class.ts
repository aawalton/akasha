import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordLegend = {
  id: "01a06586-0a61-7b34-b31d-67cc608dd49a",
  type: "page-type/world-class",
  slug: "sword-legend",
  title: "Sword Legend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
