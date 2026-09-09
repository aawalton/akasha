import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const matthew = {
  id: "01a06808-34da-7015-93bd-3161bc1ed364",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "matthew",
  title: "Matthew",
  partOfCollections: ["new-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "matthew",
} as const satisfies ScriptureCollection
