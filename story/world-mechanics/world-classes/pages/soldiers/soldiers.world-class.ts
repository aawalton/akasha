import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const soldiers = {
  id: "01a06586-0a4c-709f-b2c7-16446b1e8c99",
  type: "world-class",
  slug: "soldiers",
  title: "Soldiers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
