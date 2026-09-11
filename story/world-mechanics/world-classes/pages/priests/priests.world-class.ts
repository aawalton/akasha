import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const priests = {
  id: "01a06586-0a0c-7b61-a9b8-7a0a98e3af20",
  type: "world-class",
  slug: "priests",
  title: "Priests",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
