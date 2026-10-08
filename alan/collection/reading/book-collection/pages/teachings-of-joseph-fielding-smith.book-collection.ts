import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const teachingsOfJosephFieldingSmith = {
  id: "01a06808-148f-7015-9895-a12daee963db",
  type: "page-type/book-collection",
  slug: "teachings-of-joseph-fielding-smith",
  title: "Teachings of Joseph Fielding Smith",
  partOfCollections: ["author/joseph-fielding-smith"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
