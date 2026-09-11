import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const advisor = {
  id: "01a0657e-1326-75d6-9969-9fccd9995161",
  type: "world-class",
  slug: "advisor",
  title: "Advisor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
