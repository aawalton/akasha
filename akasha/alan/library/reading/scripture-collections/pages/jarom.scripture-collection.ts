import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const jarom = {
  id: "01a06808-34da-7005-bc43-6f79900ed71f",
  pageTypeSlug: "scripture-collection",
  slug: "jarom",
  title: "Jarom",
  partOfSlugs: ["book-of-mormon"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "jarom",
} as const satisfies ScriptureCollection
