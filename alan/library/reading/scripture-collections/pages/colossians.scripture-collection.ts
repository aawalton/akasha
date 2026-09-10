import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const colossians = {
  id: "01a06808-34d9-701b-8919-faf935f794cc",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "colossians",
  title: "Colossians",
  partOfCollections: ["new-testament"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "colossians",
} as const satisfies ScriptureCollection
