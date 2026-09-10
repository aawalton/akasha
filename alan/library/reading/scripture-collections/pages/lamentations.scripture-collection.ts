import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const lamentations = {
  id: "01a06808-34da-7010-b299-2dbfde5838a7",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "lamentations",
  title: "Lamentations",
  partOfCollections: ["old-testament"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "lamentations",
} as const satisfies ScriptureCollection
