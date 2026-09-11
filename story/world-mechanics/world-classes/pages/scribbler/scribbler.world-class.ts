import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const scribbler = {
  id: "01a06586-0a2c-78d2-a0b1-64dfd69246b9",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "scribbler",
  title: "Scribbler",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
