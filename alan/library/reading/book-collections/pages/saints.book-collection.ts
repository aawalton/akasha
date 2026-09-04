import type { BookCollection } from "../book-collection.page-type.ts"

export const saints = {
  id: "01a06808-148f-700d-bb5f-0fcfab48d5fe",
  pageTypeSlug: "book-collection",
  slug: "saints",
  title: "Saints",
  partOfSlugs: ["histories-3"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
