import type { BookCollection } from "../book-collection.page-type.ts"

export const theSecondWorldWar = {
  id: "01a06808-148f-702f-a067-53ad9c185fc5",
  pageTypeSlug: "book-collection",
  slug: "the-second-world-war",
  title: "The Second World War",
  partOfSlugs: ["histories-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
