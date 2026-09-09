import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const oldTestament = {
  id: "01a06808-34da-7021-b812-782b7750429c",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "old-testament",
  title: "Old Testament",
  partOfCollections: ["scriptures"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "oldtestament",
} as const satisfies ScriptureCollection
