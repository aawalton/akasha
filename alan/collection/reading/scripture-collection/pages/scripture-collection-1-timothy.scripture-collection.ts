import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection1Timothy = {
  id: "01a06808-34d9-7008-90e9-5053bc200bec",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-1-timothy",
  title: "1 Timothy",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy",
} as const satisfies ScriptureCollection
