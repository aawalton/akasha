import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const joshua = {
  id: "01a06808-34da-700d-a0ee-8f3f8962418b",
  pageTypeSlug: "scripture-collection",
  slug: "joshua",
  title: "Joshua",
  partOfSlugs: ["old-testament"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "joshua",
} as const satisfies ScriptureCollection
