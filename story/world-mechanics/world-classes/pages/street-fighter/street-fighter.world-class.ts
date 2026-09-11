import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const streetFighter = {
  id: "01a06586-0a5d-7b80-b50c-7a7b9a2229e6",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "street-fighter",
  title: "Street Fighter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
