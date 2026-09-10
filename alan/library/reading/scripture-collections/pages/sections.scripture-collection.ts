import type { ScriptureCollection } from "../scripture-collection.page-type.types.ts"

export const sections = {
  id: "01a06808-34da-702c-830f-592e5d563ef5",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "sections",
  title: "Sections",
  partOfCollections: ["doctrine-and-covenants"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "doctrineandcovenants",
} as const satisfies ScriptureCollection
