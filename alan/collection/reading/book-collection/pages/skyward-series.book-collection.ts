import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const skywardSeries = {
  id: "01a06808-148f-7011-a229-80513c4bc717",
  type: "page-type/book-collection",
  slug: "skyward-series",
  title: "Skyward Series",
  partOfCollections: ["book-collection/cytoverse"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
