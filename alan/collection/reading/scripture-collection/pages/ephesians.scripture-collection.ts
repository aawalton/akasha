import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ephesians = {
  id: "01a06808-34d9-7021-8f6c-7316450c066d",
  type: "page-type/scripture-collection",
  slug: "ephesians",
  title: "Ephesians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ephesians",
} as const satisfies ScriptureCollection
