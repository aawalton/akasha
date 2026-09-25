import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const articlesOfFaith = {
  id: "01a06808-34d9-7019-92bb-c8fb2e1bd4f1",
  type: "page-type/scripture-collection",
  slug: "articles-of-faith",
  title: "Articles of Faith",
  partOfCollections: ["scripture-collection/pearl-of-great-price"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "articlesoffaith",
} as const satisfies ScriptureCollection
