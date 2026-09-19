import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageCommander = {
  id: "01a0657e-0221-785e-9035-68f127f6887b",
  type: "page-type/world-class",
  slug: "mage-commander",
  title: "Mage-Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
