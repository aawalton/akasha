import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wizard = {
  id: "01a0657e-0272-70e7-bbe3-9907d940649f",
  type: "page-type/world-class",
  slug: "wizard",
  title: "Wizard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
