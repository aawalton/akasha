import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const revelation = {
  id: "01a06808-34da-7028-adda-87d0a417c500",
  pageTypeSlug: "scripture-collection",
  slug: "revelation",
  title: "Revelation",
  partOfSlugs: ["new-testament"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "revelation",
} as const satisfies ScriptureCollection
