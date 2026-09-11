import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const staffmaster = {
  id: "01a06586-0a52-7939-917b-27f06ea8537f",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "staffmaster",
  title: "Staffmaster",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
