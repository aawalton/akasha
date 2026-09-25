import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const deuteronomy = {
  id: "01a06808-34d9-701d-b7b4-70ce9273308e",
  type: "page-type/scripture-collection",
  slug: "deuteronomy",
  title: "Deuteronomy",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "deuteronomy",
} as const satisfies ScriptureCollection
