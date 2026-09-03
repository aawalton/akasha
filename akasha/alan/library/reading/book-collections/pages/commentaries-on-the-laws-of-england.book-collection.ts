import type { BookCollection } from "../book-collection.page-type.ts"

export const commentariesOnTheLawsOfEngland = {
  id: "01a06808-148e-7013-9b52-2a421e673ea0",
  pageTypeSlug: "book-collection",
  slug: "commentaries-on-the-laws-of-england",
  title: "Commentaries on the Laws of England",
  partOfSlugs: ["commentaries"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
