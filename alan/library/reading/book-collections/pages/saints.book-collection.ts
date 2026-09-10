import type { BookCollection } from "../book-collection.page-type.types.ts"

export const saints = {
  id: "01a06808-148f-700d-bb5f-0fcfab48d5fe",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "saints",
  title: "Saints",
  partOfCollections: ["histories-3"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
