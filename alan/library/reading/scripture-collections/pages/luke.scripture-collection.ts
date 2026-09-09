import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const luke = {
  id: "01a06808-34da-7012-9add-2e0be31817b4",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "luke",
  title: "Luke",
  partOfCollections: ["new-testament"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "luke",
} as const satisfies ScriptureCollection
