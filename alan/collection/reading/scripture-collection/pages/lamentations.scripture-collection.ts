import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const lamentations = {
  id: "01a06808-34da-7010-b299-2dbfde5838a7",
  type: "page-type/scripture-collection",
  slug: "lamentations",
  title: "Lamentations",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "lamentations",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
