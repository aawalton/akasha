import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const jonah = {
  id: "01a06808-34da-700a-a8e4-bc02c51e7c36",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "jonah",
  title: "Jonah",
  partOfCollections: ["old-testament"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "jonah",
} as const satisfies ScriptureCollection
