import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ezekiel = {
  id: "01a06808-34d9-7025-90c7-963b83dbdea2",
  type: "page-type/scripture-collection",
  slug: "ezekiel",
  title: "Ezekiel",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezekiel",
} as const satisfies ScriptureCollection
