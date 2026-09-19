import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const forestKnights = {
  id: "01a0657e-01de-7069-9b9d-6f3d4917162f",
  type: "page-type/world-class",
  slug: "forest-knights",
  title: "Forest Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
