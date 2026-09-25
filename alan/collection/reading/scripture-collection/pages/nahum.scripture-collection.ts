import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const nahum = {
  id: "01a06808-34da-701b-b662-9fd2e2947a7a",
  type: "page-type/scripture-collection",
  slug: "nahum",
  title: "Nahum",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 34,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "nahum",
} as const satisfies ScriptureCollection
