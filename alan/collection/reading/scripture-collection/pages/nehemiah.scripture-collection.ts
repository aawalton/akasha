import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const nehemiah = {
  id: "01a06808-34da-701c-9458-aa73c9057a1c",
  type: "page-type/scripture-collection",
  slug: "nehemiah",
  title: "Nehemiah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "nehemiah",
} as const satisfies ScriptureCollection
