import type { BookCollection } from "../book-collection.page-type.ts"

export const skywardSeries = {
  id: "01a06808-148f-7011-a229-80513c4bc717",
  pageTypeSlug: "book-collection",
  slug: "skyward-series",
  title: "Skyward Series",
  partOfSlugs: ["cytoverse"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
} as const satisfies BookCollection
