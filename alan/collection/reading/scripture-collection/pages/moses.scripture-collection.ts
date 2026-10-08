import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const moses = {
  id: "01a06808-34da-7019-937c-3b9ef503a97e",
  type: "page-type/scripture-collection",
  slug: "moses",
  title: "Moses",
  partOfCollections: ["scripture-collection/pearl-of-great-price"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "moses",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
