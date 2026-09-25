import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const titus = {
  id: "01a06808-34da-702e-8122-9a0f96b204a0",
  type: "page-type/scripture-collection",
  slug: "titus",
  title: "Titus",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "titus",
} as const satisfies ScriptureCollection
