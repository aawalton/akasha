import type { BookCollection } from "../book-collection.page-type.ts"

export const humanxCommonwealth = {
  id: "01a06808-148e-702b-8521-f2e9220a813f",
  pageTypeSlug: "book-collection",
  slug: "humanx-commonwealth",
  title: "Humanx Commonwealth",
  partOfSlugs: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
