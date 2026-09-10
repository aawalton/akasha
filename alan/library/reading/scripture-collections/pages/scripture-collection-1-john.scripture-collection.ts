import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const scriptureCollection1John = {
  id: "01a06808-34d9-7002-acff-80fbbfd44341",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "scripture-collection-1-john",
  title: "1 John",
  partOfCollections: ["new-testament"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "1john",
} as const satisfies ScriptureCollection
