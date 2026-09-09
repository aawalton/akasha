import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const isaiah = {
  id: "01a06808-34da-7002-91e7-4f028553eed1",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "isaiah",
  title: "Isaiah",
  partOfCollections: ["old-testament"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "isaiah",
} as const satisfies ScriptureCollection
