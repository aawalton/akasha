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
} as const satisfies ScriptureCollection
