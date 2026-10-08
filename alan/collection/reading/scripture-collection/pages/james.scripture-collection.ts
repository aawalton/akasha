import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const james = {
  id: "01a06808-34da-7004-a9a8-5253de1ead2e",
  type: "page-type/scripture-collection",
  slug: "james",
  title: "James",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "james",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
