import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const deuteronomy = {
  id: "01a06808-34d9-701d-b7b4-70ce9273308e",
  type: "scripture-collection",
  slug: "deuteronomy",
  title: "Deuteronomy",
  partOfCollections: ["old-testament"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "deuteronomy",
} as const satisfies ScriptureCollection
