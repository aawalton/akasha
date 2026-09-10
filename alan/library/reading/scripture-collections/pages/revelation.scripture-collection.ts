import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const revelation = {
  id: "01a06808-34da-7028-adda-87d0a417c500",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "revelation",
  title: "Revelation",
  partOfCollections: ["new-testament"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "revelation",
} as const satisfies ScriptureCollection
