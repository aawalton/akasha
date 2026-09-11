import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const jeremiah = {
  id: "01a06808-34da-7006-bc42-319c077833e8",
  type: "scripture-collection",
  slug: "jeremiah",
  title: "Jeremiah",
  partOfCollections: ["old-testament"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "jeremiah",
} as const satisfies ScriptureCollection
