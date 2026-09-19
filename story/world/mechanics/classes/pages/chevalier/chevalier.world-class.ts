import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chevalier = {
  id: "01a0657e-1349-794e-8e03-8f197f6331f2",
  type: "page-type/world-class",
  slug: "chevalier",
  title: "Chevalier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
