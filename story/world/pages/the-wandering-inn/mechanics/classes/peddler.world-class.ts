import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peddler = {
  id: "01a0657e-0237-7822-a0b0-d42a6fe68af8",
  type: "page-type/world-class",
  slug: "peddler",
  title: "Peddler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
