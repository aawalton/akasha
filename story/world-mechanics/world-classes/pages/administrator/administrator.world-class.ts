import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const administrator = {
  id: "01a0657e-01a4-7f1c-bb37-d9903711e45d",
  type: "world-class",
  slug: "administrator",
  title: "Administrator",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
