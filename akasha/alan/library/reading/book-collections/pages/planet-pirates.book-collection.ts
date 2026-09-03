import type { BookCollection } from "../book-collection.page-type.ts"

export const planetPirates = {
  id: "01a06808-148f-700a-9aee-37b9d1f40bd1",
  pageTypeSlug: "book-collection",
  slug: "planet-pirates",
  title: "Planet Pirates",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
