import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const hebrews = {
  id: "01a06808-34d9-702b-ae4b-115bc4ae4c24",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "hebrews",
  title: "Hebrews",
  partOfCollections: ["new-testament"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "hebrews",
} as const satisfies ScriptureCollection
