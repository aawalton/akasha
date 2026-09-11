import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const villagers = {
  id: "01a0657e-026f-7fca-b4af-b5938d8fcfa8",
  type: "world-class",
  slug: "villagers",
  title: "Villagers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
