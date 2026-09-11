import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const omni = {
  id: "01a06808-34da-7022-b317-aa602ba087c3",
  type: "scripture-collection",
  slug: "omni",
  title: "Omni",
  partOfCollections: ["book-of-mormon"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "omni",
} as const satisfies ScriptureCollection
