import type { BookCollection } from "../book-collection.page-type.ts"

export const nonesuchDickens = {
  id: "01a06808-148f-7006-88b5-460c3b420aa5",
  pageTypeSlug: "book-collection",
  slug: "nonesuch-dickens",
  title: "Nonesuch Dickens",
  partOfSlugs: ["classics-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
