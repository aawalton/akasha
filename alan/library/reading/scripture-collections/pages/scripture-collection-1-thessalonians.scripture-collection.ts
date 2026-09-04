import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Thessalonians = {
  id: "01a06808-34d9-7007-ba82-69d6e2f0e616",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-thessalonians",
  title: "1 Thessalonians",
  partOfSlugs: ["new-testament"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1thessalonians",
} as const satisfies ScriptureCollection
