import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mechanic = {
  id: "01a0657e-0230-73fd-8553-6089e7b9fbd3",
  type: "page-type/world-class",
  slug: "mechanic",
  title: "Mechanic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
