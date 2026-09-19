import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ganger = {
  id: "01a0657e-01df-797c-a444-43aa33aa5eaf",
  type: "page-type/world-class",
  slug: "ganger",
  title: "Ganger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
