import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Peter = {
  id: "01a06808-34d9-7005-9ad3-a8b8f5e3c379",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-peter",
  title: "1 Peter",
  partOfSlugs: ["new-testament"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1peter",
} as const satisfies ScriptureCollection
