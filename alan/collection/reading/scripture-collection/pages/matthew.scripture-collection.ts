import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const matthew = {
  id: "01a06808-34da-7015-93bd-3161bc1ed364",
  type: "page-type/scripture-collection",
  slug: "matthew",
  title: "Matthew",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
