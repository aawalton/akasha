import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const john = {
  id: "01a06808-34da-7009-a603-2c96fb8189e0",
  type: "scripture-collection",
  slug: "john",
  title: "John",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john",
} as const satisfies ScriptureCollection
