import type { BookCollection } from "../book-collection.page-type.ts"

export const jeffersonAndHisTime = {
  id: "01a06808-148f-7001-bee1-ecd74d5a1354",
  pageTypeSlug: "book-collection",
  slug: "jefferson-and-his-time",
  title: "Jefferson & His Time",
  partOfCollections: ["histories-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
