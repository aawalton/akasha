import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const sections = {
  id: "01a06808-34da-702c-830f-592e5d563ef5",
  type: "page-type/scripture-collection",
  slug: "sections",
  title: "Sections",
  partOfCollections: ["scripture-collection/doctrine-and-covenants"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "doctrineandcovenants",
} as const satisfies ScriptureCollection
