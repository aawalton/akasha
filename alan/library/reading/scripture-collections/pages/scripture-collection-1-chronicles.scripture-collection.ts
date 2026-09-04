import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Chronicles = {
  id: "01a06808-34d9-7000-b2b3-6aca38dc87f3",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-chronicles",
  title: "1 Chronicles",
  partOfSlugs: ["old-testament"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1chronicles",
} as const satisfies ScriptureCollection
