import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const confectioner = {
  id: "01a0657e-01c9-72ab-8410-ad78d67c61df",
  type: "page-type/world-class",
  slug: "confectioner",
  title: "Confectioner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
