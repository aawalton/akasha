import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Timothy = {
  id: "01a06808-34d9-7011-9223-e49efd1d6147",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-timothy",
  title: "2 Timothy",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2timothy",
} as const satisfies ScriptureCollection
