import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const acts = {
  id: "01a06808-34d9-7016-b321-4bdc1ef9b541",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "acts",
  title: "Acts",
  partOfCollections: ["new-testament"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "acts",
} as const satisfies ScriptureCollection
