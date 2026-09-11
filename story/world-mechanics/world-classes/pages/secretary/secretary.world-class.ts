import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const secretary = {
  id: "01a0657e-024c-7b5a-bb26-e09361d0f456",
  type: "world-class",
  slug: "secretary",
  title: "Secretary",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
