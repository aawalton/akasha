import type { BookCollection } from "../book-collection.page-type.ts"

export const foundingOfTheCommonwealth = {
  id: "01a06808-148e-7021-a64b-68d33f34a3e5",
  pageTypeSlug: "book-collection",
  slug: "founding-of-the-commonwealth",
  title: "Founding of the Commonwealth",
  partOfSlugs: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
