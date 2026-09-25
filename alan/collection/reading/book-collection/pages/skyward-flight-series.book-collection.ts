import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const skywardFlightSeries = {
  id: "01a06808-148f-7010-830e-ee9ecf673495",
  type: "page-type/book-collection",
  slug: "skyward-flight-series",
  title: "Skyward Flight Series",
  partOfCollections: ["book-collection/cytoverse"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
} as const satisfies BookCollection
