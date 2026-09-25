import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ezra = {
  id: "01a06808-34d9-7026-beff-5561d6fe8d62",
  type: "page-type/scripture-collection",
  slug: "ezra",
  title: "Ezra",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra",
} as const satisfies ScriptureCollection
