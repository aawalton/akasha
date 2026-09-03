import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const genesis = {
  id: "01a06808-34d9-7028-8756-630f4b736470",
  pageTypeSlug: "scripture-collection",
  slug: "genesis",
  title: "Genesis",
  partOfSlugs: ["old-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "genesis",
} as const satisfies ScriptureCollection
