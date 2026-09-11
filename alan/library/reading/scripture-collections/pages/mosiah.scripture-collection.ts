import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const mosiah = {
  id: "01a06808-34da-701a-8879-2f72ecf2a3cc",
  type: "scripture-collection",
  slug: "mosiah",
  title: "Mosiah",
  partOfCollections: ["book-of-mormon"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "mosiah",
} as const satisfies ScriptureCollection
