import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const unstoppableRoller = {
  id: "01a06586-0a6e-7028-949d-e1f4bc49d6a5",
  type: "page-type/world-class",
  slug: "unstoppable-roller",
  title: "Unstoppable Roller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
