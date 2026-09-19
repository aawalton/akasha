import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterChariot = {
  id: "01a0657e-139e-7d58-950e-f9bba093773d",
  type: "page-type/world-class",
  slug: "master-chariot",
  title: "Master Chariot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
