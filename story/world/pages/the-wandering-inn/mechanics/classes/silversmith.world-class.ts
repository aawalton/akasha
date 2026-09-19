import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const silversmith = {
  id: "01a06586-0a3d-777c-a1c6-661fff3f6690",
  type: "page-type/world-class",
  slug: "silversmith",
  title: "Silversmith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
