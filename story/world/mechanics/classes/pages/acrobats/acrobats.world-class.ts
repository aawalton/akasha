import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const acrobats = {
  id: "01a0657e-1324-7478-afc8-79f9a46839c4",
  type: "page-type/world-class",
  slug: "acrobats",
  title: "Acrobats",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
