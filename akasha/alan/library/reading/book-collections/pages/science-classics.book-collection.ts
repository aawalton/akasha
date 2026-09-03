import type { BookCollection } from "../book-collection.page-type.ts"

export const scienceClassics = {
  id: "01a06808-148f-700f-9486-4754bedd97d4",
  pageTypeSlug: "book-collection",
  slug: "science-classics",
  title: "Science Classics",
  partOfSlugs: ["classics-collections"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
