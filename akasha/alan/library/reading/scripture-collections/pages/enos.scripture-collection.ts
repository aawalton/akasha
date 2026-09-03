import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const enos = {
  id: "01a06808-34d9-7020-a0bd-c5988ea9dd68",
  pageTypeSlug: "scripture-collection",
  slug: "enos",
  title: "Enos",
  partOfSlugs: ["book-of-mormon"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "enos",
} as const satisfies ScriptureCollection
