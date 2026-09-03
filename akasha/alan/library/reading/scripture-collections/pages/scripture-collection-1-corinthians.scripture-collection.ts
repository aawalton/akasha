import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Corinthians = {
  id: "01a06808-34d9-7001-9f3d-b9ea278fd7af",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-corinthians",
  title: "1 Corinthians",
  partOfSlugs: ["new-testament"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1corinthians",
} as const satisfies ScriptureCollection
