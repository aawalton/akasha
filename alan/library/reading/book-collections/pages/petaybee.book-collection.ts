import type { BookCollection } from "../book-collection.page-type.ts"

export const petaybee = {
  id: "01a06808-148f-7008-b985-9e7ad4921149",
  pageTypeSlug: "book-collection",
  slug: "petaybee",
  title: "Petaybee",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
