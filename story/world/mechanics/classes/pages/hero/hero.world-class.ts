import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hero = {
  id: "01a0657e-01f8-7614-b278-7a0003d4a66f",
  type: "page-type/world-class",
  slug: "hero",
  title: "Hero",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
