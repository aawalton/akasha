import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection3John = {
  id: "01a06808-34d9-7012-87b2-14779115ace1",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-3-john",
  title: "3 John",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "3john",
} as const satisfies ScriptureCollection
