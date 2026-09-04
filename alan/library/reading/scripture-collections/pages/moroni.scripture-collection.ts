import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const moroni = {
  id: "01a06808-34da-7018-969c-17d3b28dc0fe",
  pageTypeSlug: "scripture-collection",
  slug: "moroni",
  title: "Moroni",
  partOfSlugs: ["book-of-mormon"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "moroni",
} as const satisfies ScriptureCollection
