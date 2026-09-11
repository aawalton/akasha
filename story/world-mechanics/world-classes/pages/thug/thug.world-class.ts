import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const thug = {
  id: "01a06586-0a68-7e91-835a-77b670274b5e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "thug",
  title: "Thug",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
