import type { BookCollection } from "../book-collection.page-type.ts"

export const folkTales = {
  id: "01a06808-148e-7020-a3bb-9928066a0514",
  pageTypeSlug: "book-collection",
  slug: "folk-tales",
  title: "Folk Tales",
  partOfSlugs: ["classics-collections"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
