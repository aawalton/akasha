import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const swordsman = {
  id: "01a0657e-0263-7b8f-a8c1-713bc2730a98",
  type: "world-class",
  slug: "swordsman",
  title: "Swordsman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
