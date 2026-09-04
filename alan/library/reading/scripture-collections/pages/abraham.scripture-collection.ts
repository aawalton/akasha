import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const abraham = {
  id: "01a06808-34d9-7015-ad36-5ca49321055c",
  pageTypeSlug: "scripture-collection",
  slug: "abraham",
  title: "Abraham",
  partOfSlugs: ["pearl-of-great-price"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "abraham",
} as const satisfies ScriptureCollection
