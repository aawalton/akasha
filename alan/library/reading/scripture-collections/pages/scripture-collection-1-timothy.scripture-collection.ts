import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Timothy = {
  id: "01a06808-34d9-7008-90e9-5053bc200bec",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-timothy",
  title: "1 Timothy",
  partOfSlugs: ["new-testament"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1timothy",
} as const satisfies ScriptureCollection
