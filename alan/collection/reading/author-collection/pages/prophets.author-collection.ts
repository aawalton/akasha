import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const prophets = {
  id: "01a06808-06b4-7008-9b38-b83cb9147f22",
  type: "page-type/author-collection",
  slug: "prophets",
  title: "Prophets",
  partOfCollections: ["author-collection/faith-authors"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:11.604Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies AuthorCollection
