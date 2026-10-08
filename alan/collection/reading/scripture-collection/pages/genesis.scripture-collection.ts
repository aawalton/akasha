import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const genesis = {
  id: "01a06808-34d9-7028-8756-630f4b736470",
  type: "page-type/scripture-collection",
  slug: "genesis",
  title: "Genesis",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "genesis",
  createdAt: "2026-09-03T16:09:23.417Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
