import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const barman = {
  id: "01a0657e-01b2-7d66-bb48-59ba713af02b",
  type: "world-class",
  slug: "barman",
  title: "Barman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
