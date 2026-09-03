import type { BookCollection } from "../book-collection.page-type.ts"

export const twinsOfPetaybee = {
  id: "01a06808-148f-703a-8283-3db637f3a349",
  pageTypeSlug: "book-collection",
  slug: "twins-of-petaybee",
  title: "Twins of Petaybee",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
