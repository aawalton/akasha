import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const obadiah = {
  id: "01a06808-34da-701f-a36e-8d92085c59c3",
  type: "page-type/scripture-collection",
  slug: "obadiah",
  title: "Obadiah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 31,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "obadiah",
} as const satisfies ScriptureCollection
