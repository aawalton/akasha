import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const musician = {
  id: "01a0657e-0234-799b-b4f7-96ce24189b26",
  type: "page-type/world-class",
  slug: "musician",
  title: "Musician",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
