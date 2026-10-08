import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const revelation = {
  id: "01a06808-34da-7028-adda-87d0a417c500",
  type: "page-type/scripture-collection",
  slug: "revelation",
  title: "Revelation",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
