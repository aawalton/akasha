import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const bookOfMormon = {
  id: "01a06808-34d9-701a-98c7-0aeb69cef05d",
  type: "page-type/scripture-collection",
  slug: "book-of-mormon",
  title: "Book of Mormon",
  partOfCollections: ["scripture-collection/scriptures"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "bookofmormon",
  createdAt: "2026-09-03T16:09:23.417Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
