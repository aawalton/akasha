import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const pillagers = {
  id: "01a06586-0a06-7e0b-ac6c-7a01fcbb4219",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "pillagers",
  title: "Pillagers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
