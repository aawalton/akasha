import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const piper = {
  id: "01a0657e-0237-775b-88b1-977128f759dd",
  type: "page-type/world-class",
  slug: "piper",
  title: "Piper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
