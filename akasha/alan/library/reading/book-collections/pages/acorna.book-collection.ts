import type { BookCollection } from "../book-collection.page-type.ts"

export const acorna = {
  id: "01a06808-148d-7000-8fd3-6c5914c2df3e",
  pageTypeSlug: "book-collection",
  slug: "acorna",
  title: "Acorna",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
