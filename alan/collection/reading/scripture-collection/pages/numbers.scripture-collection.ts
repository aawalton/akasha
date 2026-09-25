import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const numbers = {
  id: "01a06808-34da-701e-8896-2fa1842f5066",
  type: "page-type/scripture-collection",
  slug: "numbers",
  title: "Numbers",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "numbers",
} as const satisfies ScriptureCollection
