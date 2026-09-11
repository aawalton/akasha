import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const gnoll = {
  id: "01a0657e-01e2-7641-8ee1-f4ef350efd88",
  type: "world-class",
  slug: "gnoll",
  title: "Gnoll",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
