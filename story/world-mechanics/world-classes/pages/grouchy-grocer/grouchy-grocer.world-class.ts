import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const grouchyGrocer = {
  id: "01a0657e-136e-7a6c-aac3-4ec4491a8ca3",
  type: "world-class",
  slug: "grouchy-grocer",
  title: "Grouchy Grocer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
