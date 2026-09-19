import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fencer = {
  id: "01a0657e-1364-7416-afc5-1a634a891a1f",
  type: "page-type/world-class",
  slug: "fencer",
  title: "Fencer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
