import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shopkeeper = {
  id: "01a06586-0a3c-7602-aa15-6f5e3f1bc4fc",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shopkeeper",
  title: "Shopkeeper",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
