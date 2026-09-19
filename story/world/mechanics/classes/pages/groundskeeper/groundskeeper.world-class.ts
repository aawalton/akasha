import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const groundskeeper = {
  id: "01a0657e-01e5-74b5-892d-922ae3f55044",
  type: "page-type/world-class",
  slug: "groundskeeper",
  title: "Groundskeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
