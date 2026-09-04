import type { BookCollection } from "../book-collection.page-type.ts"

export const partnersInCrime = {
  id: "01a06808-148f-7007-a617-57d07f3516f1",
  pageTypeSlug: "book-collection",
  slug: "partners-in-crime",
  title: "Partners in Crime",
  partOfSlugs: ["tommy-and-tuppence"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
