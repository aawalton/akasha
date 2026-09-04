import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Kings = {
  id: "01a06808-34d9-7003-9369-69438e4d217e",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-kings",
  title: "1 Kings",
  partOfSlugs: ["old-testament"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1kings",
} as const satisfies ScriptureCollection
