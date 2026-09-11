import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const smithKing = {
  id: "01a06586-0a43-78ed-8c1b-721938e52217",
  type: "world-class",
  slug: "smith-king",
  title: "Smith-King",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
