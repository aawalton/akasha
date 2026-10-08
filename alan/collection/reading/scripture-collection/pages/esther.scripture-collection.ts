import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const esther = {
  id: "01a06808-34d9-7022-a7df-b5f2c7367364",
  type: "page-type/scripture-collection",
  slug: "esther",
  title: "Esther",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "esther",
  createdAt: "2026-09-03T16:09:23.417Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
