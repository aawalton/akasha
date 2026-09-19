import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const saxophonePlayer = {
  id: "01a06586-0a2a-779e-afab-e52833ee06e1",
  type: "page-type/world-class",
  slug: "saxophone-player",
  title: "Saxophone Player",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
