import type { BookCollection } from "../book-collection.page-type.ts"

export const skywardFlightSeries = {
  id: "01a06808-148f-7010-830e-ee9ecf673495",
  pageTypeSlug: "book-collection",
  slug: "skyward-flight-series",
  title: "Skyward Flight Series",
  partOfSlugs: ["cytoverse"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
} as const satisfies BookCollection
