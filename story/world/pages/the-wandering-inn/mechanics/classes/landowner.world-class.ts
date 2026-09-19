import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const landowner = {
  id: "01a0657e-138c-7c1f-99dd-047caa8323f3",
  type: "page-type/world-class",
  slug: "landowner",
  title: "Landowner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
