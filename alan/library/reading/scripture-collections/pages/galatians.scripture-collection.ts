import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const galatians = {
  id: "01a06808-34d9-7027-bc1d-b90e2b884557",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "galatians",
  title: "Galatians",
  partOfCollections: ["new-testament"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "galatians",
} as const satisfies ScriptureCollection
