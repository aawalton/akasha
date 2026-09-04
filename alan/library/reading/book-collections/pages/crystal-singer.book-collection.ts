import type { BookCollection } from "../book-collection.page-type.ts"

export const crystalSinger = {
  id: "01a06808-148e-7014-b195-e0cc3f7ef599",
  pageTypeSlug: "book-collection",
  slug: "crystal-singer",
  title: "Crystal Singer",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
