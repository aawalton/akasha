import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const ephesians = {
  id: "01a06808-34d9-7021-8f6c-7316450c066d",
  pageTypeSlug: "scripture-collection",
  slug: "ephesians",
  title: "Ephesians",
  partOfCollections: ["new-testament"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "ephesians",
} as const satisfies ScriptureCollection
