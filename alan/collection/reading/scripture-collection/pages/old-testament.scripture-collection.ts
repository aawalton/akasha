import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const oldTestament = {
  id: "01a06808-34da-7021-b812-782b7750429c",
  type: "page-type/scripture-collection",
  slug: "old-testament",
  title: "Old Testament",
  partOfCollections: ["scripture-collection/scriptures"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "oldtestament",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
