import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const matthew = {
  id: "01a06808-34da-7015-93bd-3161bc1ed364",
  pageTypeSlug: "scripture-collection",
  slug: "matthew",
  title: "Matthew",
  partOfSlugs: ["new-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "matthew",
} as const satisfies ScriptureCollection
