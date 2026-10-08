import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const apostles = {
  id: "01a06808-06b4-7000-bf64-7a91fb325918",
  type: "page-type/author-collection",
  slug: "apostles",
  title: "Apostles",
  partOfCollections: ["author-collection/faith-authors"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:11.604Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies AuthorCollection
