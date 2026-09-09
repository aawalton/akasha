import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const ezekiel = {
  id: "01a06808-34d9-7025-90c7-963b83dbdea2",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "ezekiel",
  title: "Ezekiel",
  partOfCollections: ["old-testament"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "ezekiel",
} as const satisfies ScriptureCollection
