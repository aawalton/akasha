import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Nephi = {
  id: "01a06808-34d9-7004-a2c3-cebf1a99f1cd",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-nephi",
  title: "1 Nephi",
  partOfSlugs: ["book-of-mormon"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1nephi",
} as const satisfies ScriptureCollection
