import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const jacob = {
  id: "01a06808-34da-7003-90a2-16493eee971d",
  pageTypeSlug: "scripture-collection",
  slug: "jacob",
  title: "Jacob",
  partOfSlugs: ["book-of-mormon"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "jacob",
} as const satisfies ScriptureCollection
