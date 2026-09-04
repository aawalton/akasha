import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const helaman = {
  id: "01a06808-34da-7000-b029-3cb33ba310e4",
  pageTypeSlug: "scripture-collection",
  slug: "helaman",
  title: "Helaman",
  partOfSlugs: ["book-of-mormon"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "helaman",
} as const satisfies ScriptureCollection
