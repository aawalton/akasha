import type { BookCollection } from "../book-collection.page-type.ts"

export const alcatraz = {
  id: "01a06808-148e-7001-9e7d-64c0c87293ac",
  pageTypeSlug: "book-collection",
  slug: "alcatraz",
  title: "Alcatraz",
  partOfSlugs: ["brandon-sanderson-s-non-cosmere-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
  rank: "B",
} as const satisfies BookCollection
