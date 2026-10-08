import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const omni = {
  id: "01a06808-34da-7022-b317-aa602ba087c3",
  type: "page-type/scripture-collection",
  slug: "omni",
  title: "Omni",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "omni",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
