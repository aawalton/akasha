import type { BookCollection } from "../book-collection.page-type.ts"

export const healthAndWellness = {
  id: "01a06808-148e-7025-b58e-99fcf9f280bf",
  pageTypeSlug: "book-collection",
  slug: "health-and-wellness",
  title: "Health & Wellness",
  partOfCollections: ["audible"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "in-progress",
} as const satisfies BookCollection
