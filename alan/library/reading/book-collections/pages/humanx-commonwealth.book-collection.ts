import type { BookCollection } from "../book-collection.page-type.types.ts"

export const humanxCommonwealth = {
  id: "01a06808-148e-702b-8521-f2e9220a813f",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "humanx-commonwealth",
  title: "Humanx Commonwealth",
  partOfCollections: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
