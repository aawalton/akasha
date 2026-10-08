import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const hebrews = {
  id: "01a06808-34d9-702b-ae4b-115bc4ae4c24",
  type: "page-type/scripture-collection",
  slug: "hebrews",
  title: "Hebrews",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "hebrews",
  createdAt: "2026-09-03T16:09:23.417Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
