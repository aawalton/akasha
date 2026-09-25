import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const doctrineAndCovenants = {
  id: "01a06808-34d9-701e-9ee4-67982860a898",
  type: "page-type/scripture-collection",
  slug: "doctrine-and-covenants",
  title: "Doctrine and Covenants",
  partOfCollections: ["scripture-collection/scriptures"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "doctrineandcovenants",
} as const satisfies ScriptureCollection
