import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const ether = {
  id: "01a06808-34d9-7023-b9ce-7e223063c9f9",
  pageTypeSlug: "scripture-collection",
  slug: "ether",
  title: "Ether",
  partOfSlugs: ["book-of-mormon"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "ether",
} as const satisfies ScriptureCollection
