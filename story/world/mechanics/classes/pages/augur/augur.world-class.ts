import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const augur = {
  id: "01a0657e-1336-754d-bed3-950e3beedfec",
  type: "page-type/world-class",
  slug: "augur",
  title: "Augur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
