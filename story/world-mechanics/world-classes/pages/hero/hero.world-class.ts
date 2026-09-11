import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const hero = {
  id: "01a0657e-01f8-7614-b278-7a0003d4a66f",
  type: "world-class",
  slug: "hero",
  title: "Hero",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
